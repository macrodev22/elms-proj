from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from .models import LeaveType
from .serializers import LeaveTypeSerializer

# Create your views here.
class ListLeaveTypes(generics.ListAPIView):
    queryset = LeaveType.objects.all()
    serializer_class = LeaveTypeSerializer