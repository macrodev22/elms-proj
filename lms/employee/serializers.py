from rest_framework import serializers
from leave.models import LeaveRequest,LeaveProcess,SupervisorQuery
from leave.serializers import LeaveTypeSerializer
from core.serializers import UserSerializer

class LeaveRequestSerializerEmp(serializers.ModelSerializer):
    type = LeaveTypeSerializer(read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    requested_by = UserSerializer(read_only=True)
    duration = serializers.SerializerMethodField()
    
    class Meta:
        model = LeaveRequest
        fields = '__all__'
    
    def get_duration(self, obj):
        return obj.duration

class LeaveProcessSerializerEmp(serializers.ModelSerializer):
    leave_request = LeaveRequestSerializerEmp(read_only=True)
    class Meta:
        model = LeaveProcess
        fields = '__all__'


class SupervisorQuerySerializerEmp(serializers.ModelSerializer):

    leave_request = LeaveRequestSerializerEmp(read_only=True)

    class Meta:
        model = SupervisorQuery 
        fields = '__all__'