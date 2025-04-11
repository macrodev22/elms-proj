from rest_framework.serializers import ModelSerializer

from core.models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ['password', 'groups', 'user_permissions']