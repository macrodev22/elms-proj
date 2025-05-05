from rest_framework.serializers import ModelSerializer,SerializerMethodField

from core.models import User

class UserSerializer(ModelSerializer):

    profile_picture_url = SerializerMethodField()

    class Meta:
        model = User
        exclude = ['groups', 'user_permissions']
        read_only_fields = ['email']
        extra_kwargs = {
            "password": { 'write_only': True }
        }
    
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