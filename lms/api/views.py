from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin
from rest_framework.exceptions import NotFound
from rest_framework import exceptions,status

from company.models import Company
from core.models import User
from core.serializers import UserSerializer

# Create your views here.
class CompanyEmployeeView(APIView):
    """
    Returns a list of employees of a given company
    """
    def get(self, request, pk):
        company = Company.objects.get(pk=pk)
        if not company:
            raise exceptions.APIException('Company no found', status.HTTP_404_NOT_FOUND)
        
        employees = User.objects.filter(company=company, role="EM")

        return Response(UserSerializer(employees, many=True).data)


