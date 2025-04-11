from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin
from rest_framework.exceptions import NotFound

from company.models import Company
from core.models import User
from .serializers import UserSerializer

# Create your views here.
class CompanyEmployeeView(APIView):
    """
    Returns a list of employees of a given company
    """
    def get(self, request, pk):
        company = Company.objects.get(pk=pk)
        if not company:
            raise NotFound('Company not found', 404)
        
        employees = User.objects.filter(company=company, role="EM")

        return Response(UserSerializer(employees, many=True).data)
