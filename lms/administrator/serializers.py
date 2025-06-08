from rest_framework import serializers 
from core.models import User
from company.models import Department,Company


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name', 'min_active_employees']
        extra_kwargs = { 
            'id' : { 'read_only': True }
          }

class UserSerializerHRAdmin(serializers.ModelSerializer):
    department_data = DepartmentSerializer(required=False, allow_null=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'middle_name', 'last_name','gender' , 'role' , 'company', 'email', 'department', 'department_data', 'password' ]
        extra_kwargs = {
            'password': { 'write_only': True, },
        }

    def create(self, validated_data):
        department_data = validated_data.pop('department_data', None)

        department = None
        # New department
        if department_data and not validated_data.get('department'):
            department = Department.objects.create(**department_data, company=validated_data['company'])

            validated_data['department'] = department

        password = validated_data.pop('password')
        validated_data['role'] = 'HR'
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        if department:
            department.head = user
            department.save()

        return user

