from rest_framework.response import Response
from rest_framework.views import APIView
from auth.authentication import JWTAuth
from rest_framework.permissions import IsAuthenticated
from core.models import User

# Create your views here.
class CreateEmployeeAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user:User = request.user

        return Response({'detail': 'well tried'})