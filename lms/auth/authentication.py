import jwt,datetime
from lms import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions,status
from core.models import User
from django.conf import settings
from core.serializers import UserSerializer

TOKEN_LIFESPAN = settings.AUTH_TOKEN_LIFESPAN

class JWTAuth(BaseAuthentication):

    def authenticate(self, request):
        token = request.COOKIES.get('token')

        if not token:
            auth_header = request.headers.get('Authorization')
            if auth_header:
                token = auth_header.split()[1]

        if not token:
            return None
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('User not authenticated')
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed('Invalid token')
        

        user = User.objects.get(pk = payload.get("uid"))

        if User is None:
            raise exceptions.AuthenticationFailed('User not found')
        
        return (user, token)

        

    @staticmethod
    def generate_token(user_id):
        payload = {
            "uid": user_id,
            "iat": datetime.datetime.now(),
            "exp": datetime.datetime.now() + datetime.timedelta(minutes=TOKEN_LIFESPAN)
        }

        return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    
    @staticmethod
    def generate_password_reset_token(user_id):
        payload = {
            "uid": user_id,
            "iat": datetime.datetime.now(),
            "exp": datetime.datetime.now() + datetime.timedelta(minutes=10)
        }
        return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    
    