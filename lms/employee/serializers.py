from rest_framework import serializers
from leave.models import LeaveRequest
from leave.serializers import LeaveTypeSerializer

class LeaveRequestSerializerEmp(serializers.ModelSerializer):
    type = LeaveTypeSerializer(read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = LeaveRequest
        fields = '__all__'
