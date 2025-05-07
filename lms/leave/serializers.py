from rest_framework.serializers import ModelSerializer 
from rest_framework import serializers
from .models import LeaveRequest,LeaveProcess,LeaveType


class LeaveProcessSerializer(ModelSerializer):
    class Meta:
        model = LeaveProcess 
        fields = '__all__'

class LeaveTypeSerializer(ModelSerializer):
    class Meta:
        model = LeaveType
        fields = '__all__'

class LeaveRequestSerializer(ModelSerializer):
    type = LeaveTypeSerializer(read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    class Meta:
        model = LeaveRequest 
        fields = '__all__'
        