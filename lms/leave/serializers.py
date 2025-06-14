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
    duration = serializers.SerializerMethodField()
    class Meta:
        model = LeaveRequest 
        fields = '__all__'
    
    def get_duration(self, obj):
        return obj.duration

class LeaveRequestCreateSerializer(ModelSerializer):
    class Meta:
        model = LeaveRequest
        fields = '__all__'        