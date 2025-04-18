from django.shortcuts import render
from rest_framework.views import APIView 
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from auth.authentication import JWTAuth
from core.models import User
from company.models import Company
from core.serializers import UserSerializer
from company.serializers import CompanySerializer

# Create your views here.
class CompanyEmployeesAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user:User = request.user
        company = user.company
        user_serializer = UserSerializer(company.users, many=True)
        return Response({"company": CompanySerializer(company).data, "employees":user_serializer.data})
    
class CompanyListCreateAPIView(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer 