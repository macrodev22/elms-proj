import datetime
from django.shortcuts import render
from rest_framework import exceptions,status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from core.serializers import UserSerializer
from company.serializers import CompanySerializer
from leave.serializers import LeaveRequestSerializer,LeaveProcessSerializer
from core.models import User
from .authentication import JWTAuth


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
          
          token = JWTAuth.generate_token(user.id)
          response = Response()
          response.data = {
              "message": "success",
              "token": token,
              "data": UserSerializer(user).data
              }
          response.set_cookie("token", token, httponly=True, expires=datetime.datetime.now()+datetime.timedelta(minutes=45))
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
        
        return Response(UserSerializer(request.user).data)
    
class ProfileAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user:User = request.user
        
        leave_requests_serializer = LeaveRequestSerializer(user.leave_requests, many=True)
        

        data = { 
            "user": UserSerializer(user).data,
            "company": CompanySerializer(user.company).data,
            "supervisor": UserSerializer(user.supervised_by).data,
            "subordinates": UserSerializer(user.subordinates, many=True).data,
            "leave_requests": leave_requests_serializer.data,
         }
        return Response(data)