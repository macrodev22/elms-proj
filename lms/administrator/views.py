from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from auth.authentication import JWTAuth
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from company.models import Company,Department
from company.serializers import DepartmentSerializer
from core.models import User
from .serializers import UserSerializerHRAdmin


# Create your views here.

class HRCreateAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated,IsAdminUser]

    def post(self, request):
        data = request.data

        serializer = UserSerializerHRAdmin(data=data)
        if(serializer.is_valid(raise_exception=True)):
            serializer.save()
        return Response(serializer.data)
    
class CompanyDepartments(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request, pk):
        company = Company.objects.filter(pk=pk).first()
        departments = company.departments
        return Response(DepartmentSerializer(departments, many=True).data)