from rest_framework.serializers import ModelSerializer,SerializerMethodField
from rest_framework import serializers

from core.models import User
from company.serializers import CompanySerializer

class UserSerializer(ModelSerializer):

    profile_picture_url = SerializerMethodField()
    role_display = serializers.CharField(source='get_role_display', read_only=True)
    gender_display = serializers.CharField(source='get_gender_display', read_only=True)

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
    
class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['groups', 'user_permissions', 'is_superuser', 'is_staff', 'last_login']
        extra_kwargs = {
            "password": { "write_only": True }
        }