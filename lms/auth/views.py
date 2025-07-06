import datetime
from django.conf import settings
from rest_framework import exceptions,status,parsers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from core.serializers import UserSerializer,PasswordChangeSerializer
from company.serializers import CompanySerializer
from leave.serializers import LeaveRequestSerializer,LeaveProcessSerializer
from core.models import User
from .authentication import JWTAuth

TOKEN_LIFESPAN = settings.AUTH_TOKEN_LIFESPAN

# Create your views here.
# Auth Views
class RegisterAPIView(APIView):
    def post(self, request):
        data = request.data
        if (data.get('password') != data.get('password_confirmation')):
            raise exceptions.ValidationError('Passwords do not match', code=status.HTTP_400_BAD_REQUEST)
        serializer = UserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

class LoginAPIView(APIView):
    def post(self, request):
          email = request.data.get('email')
          password = request.data.get('password')

          user = User.objects.filter(email=email).first()
          if not user:
              raise exceptions.AuthenticationFailed("User not found", code=status.HTTP_404_NOT_FOUND)
          
          if not user.check_password(password):
              raise exceptions.AuthenticationFailed("Invalid username or password", code=status.HTTP_400_BAD_REQUEST)
          
          if not user.is_active:
              raise exceptions.AuthenticationFailed("User is not active", code=status.HTTP_403_FORBIDDEN)
          
          token = JWTAuth.generate_token(user.id)
          response = Response()
          response.data = {
              "message": "success",
              "token": token,
              "user": UserSerializer(user, context={'request': request}).data
              }
          response.set_cookie("token", token, httponly=True, expires=datetime.datetime.now()+datetime.timedelta(minutes=TOKEN_LIFESPAN))
          return response

class LogoutAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        response = Response()
        response.data = { "message": "success" }
        response.delete_cookie('token')
        return response

class AuthenticatedUserAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        token = request.COOKIES.get('token')

        return Response({
            'user': UserSerializer(request.user, context={'request': request}).data,
            'token': token
            })
    
class ProfileAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def post(self, request):
        user:User = request.user
        
        leave_requests_serializer = LeaveRequestSerializer(user.leave_requests, many=True)
        

        data = { 
            "user": UserSerializer(user, context={'request': request}).data,
            "company": CompanySerializer(user.company).data,
            "supervisor": UserSerializer(user.supervised_by).data,
            "subordinates": UserSerializer(user.subordinates, many=True).data,
            "leave_requests": leave_requests_serializer.data,
         }
        return Response(data)
    
    def patch(self, request):
        user:User = request.user
        data = request.data

        serializer = UserSerializer(user, data=data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PasswordChangeAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = PasswordChangeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response({ "detail": "Password updated successfully" })