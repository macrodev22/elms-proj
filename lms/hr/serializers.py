from rest_framework import serializers
from leave.models import LeaveRequest,LeaveProcess,LeaveType
from leave.serializers import LeaveTypeSerializer
from core.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ['first_name', 'middle_name', 'last_name', 'email']

class LeaveRequestSerializer(serializers.ModelSerializer):
    type = LeaveTypeSerializer(read_only=True)
    requested_by = UserSerializer(read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    class Meta:
        model = LeaveRequest 
        fields = '__all__'
        