from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from auth.authentication import JWTAuth
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from company.models import Company,Department
from company.serializers import DepartmentSerializer
from core.models import User
from hr.utils import send_leave_notification
from .serializers import UserSerializerHRAdmin


# Create your views here.

class HRCreateAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated,IsAdminUser]

    def post(self, request):
        data = request.data

        serializer = UserSerializerHRAdmin(data=data)
        if(serializer.is_valid(raise_exception=True)):
            user:User = serializer.save()
            send_leave_notification(user.email, f"Your HR Account at {user.company.name} has been created", f"Dear {user.first_name,}\nYour HR account at {user.company.name} has been created successfully.\n\nLog in with the credential below:\nEmail: {user.email}\nPassword: {data['password']}\nLink: {request.scheme}://{request.get_host()}/login\n\nRegards,...\nELMS on behalf of {user.company.name}")
        return Response(serializer.data)
    
class CompanyDepartments(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request, pk):
        company = Company.objects.filter(pk=pk).first()
        departments = company.departments
        return Response(DepartmentSerializer(departments, many=True).data)