from rest_framework.serializers import ModelSerializer,SerializerMethodField
from .models import Company,Department

class CompanySerializer(ModelSerializer):
    registered_employees = SerializerMethodField()

    class Meta:
        model = Company
        fields = '__all__'
    
    def get_registered_employees(self, obj:Company):
        count = obj.users.count()
        return count

class DepartmentSerializer(ModelSerializer):
    class Meta:
        model = Department 
        fields = '__all__'