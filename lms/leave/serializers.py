from rest_framework.serializers import ModelSerializer 
from rest_framework import serializers
from core.serializers import UserMinimalSerializer
from .models import LeaveRequest,LeaveProcess,LeaveType,SupervisorQuery


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

class SupervisorQuerySerializer(ModelSerializer):
    sent_by = UserMinimalSerializer(read_only=True)
    sent_to = UserMinimalSerializer(read_only=True)

    class Meta:
        model = SupervisorQuery
        fields = '__all__'
