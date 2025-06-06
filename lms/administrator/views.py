from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from auth.authentication import JWTAuth
from rest_framework.permissions import IsAuthenticated,IsAdminUser

# Create your views here.

class HRCreateAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated,IsAdminUser]

    def post(self, request):
        return Response({})