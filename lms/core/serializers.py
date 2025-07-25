from rest_framework.serializers import ModelSerializer,SerializerMethodField
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password

from core.models import User
from company.serializers import CompanySerializer,DepartmentSerializer

class UserMinimalSerializer(ModelSerializer):
    class Meta:
        model = User 
        fields = ['first_name', 'middle_name', 'last_name', 'email', 'role', 'contact', 'gender']

class UserSerializer(ModelSerializer):

    profile_picture_url = SerializerMethodField()
    role_display = serializers.CharField(source='get_role_display', read_only=True)
    gender_display = serializers.CharField(source='get_gender_display', read_only=True)
    supervisor = serializers.SerializerMethodField()
    department = DepartmentSerializer(read_only=True)
    used_annual_leave = serializers.SerializerMethodField()

    class Meta:
        model = User
        exclude = ['groups', 'user_permissions', 'is_superuser', 'is_staff', 'last_login']
        # read_only_fields = ['email']
        extra_kwargs = {
            "password": { 'write_only': True }
        }
    
    company = CompanySerializer(read_only=True)
    
    # User registration
    def create(self, validated_data):
        password = validated_data.pop('password')
        instance = self.Meta.model(**validated_data)
        instance.set_password(password)
        instance.save()
        return instance
    
    def get_profile_picture_url(self, obj):
        request = self.context.get('request')
        if obj.profile_picture and request:
            return request.build_absolute_uri(obj.profile_picture.url) 
        elif obj.profile_picture:
            return obj.profile_picture.url
        return None
    def get_supervisor(self, obj:User):
        supervisor = obj.supervisor
        if supervisor:
            return UserMinimalSerializer(supervisor).data 
        return None
    
    def get_used_annual_leave(self, obj:User):
        used_annual_leave = obj.used_annual_leave
        return used_annual_leave
    
class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        exclude = ['groups', 'user_permissions', 'is_superuser', 'is_staff', 'last_login']
        extra_kwargs = {
            "password": { "write_only": True }
        }
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)
    new_password_confirm = serializers.CharField(required=True, write_only=True)

    def validate_old_password(self, value):
        user:User = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is incorrect")
        return value
    
    def validate(self, attrs):
        new_password = attrs.get("new_password")
        new_password_confirm = attrs.get("new_password_confirm")
        if new_password != new_password_confirm:
            raise serializers.ValidationError({"new_password_confirm": "Passwords do not match"})
        # Django validation
        user:User = self.context['request'].user
        validate_password(new_password, user)
        return attrs
    
    def save(self, **kwargs):
        user:User = self.context['request'].user
        new_password = self.validated_data['new_password']
        user.set_password(new_password)
        user.save()
        return user