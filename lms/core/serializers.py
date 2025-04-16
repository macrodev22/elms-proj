from rest_framework.serializers import ModelSerializer

from core.models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ['groups', 'user_permissions']
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