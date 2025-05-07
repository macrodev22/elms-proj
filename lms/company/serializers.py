from rest_framework.serializers import ModelSerializer 
from .models import Company,Department

class CompanySerializer(ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class DepartmentSerializer(ModelSerializer):
    class Meta:
        model = Department 
        fields = '__all__'