from django.shortcuts import render
from rest_framework.views import APIView 
from rest_framework import generics,status,exceptions
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from auth.permissions import IsHR
from auth.authentication import JWTAuth
from core.models import User
from company.models import Company,Department
from core.serializers import UserSerializer
from company.serializers import CompanySerializer,DepartmentSerializer

# Create your views here.
class CompanyEmployeesAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user:User = request.user
        company = user.company
        user_serializer = UserSerializer(company.users, many=True, context={'request': request})
        return Response({"company": CompanySerializer(company).data, "employees":user_serializer.data})
    
class CompanyListCreateAPIView(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer 

class CompanyDepartmentsAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated,IsHR]

    def get(self, request):
        user:User = request.user
        departments = Department.objects.filter(company=user.company)

        return Response(DepartmentSerializer(departments, many=True).data)
    def post(self, request):
        company:Company = request.user.company
        data = request.data
        data['company'] = company.id
        name=data.get('name')

        if data.get('head') is None:
            raise exceptions.ValidationError('Please specify head of the deparment')
        
        # No duplicate deparment in the company
        existing = Department.objects.filter(company=company, name=name).first()
        if existing is not None:
            raise exceptions.ValidationError(f"{name} already exists for {company.name}")

        department_serializer = DepartmentSerializer(data=data)
        if department_serializer.is_valid(raise_exception=True):
            department_serializer.save()
        
        return Response(department_serializer.data, status=status.HTTP_201_CREATED)