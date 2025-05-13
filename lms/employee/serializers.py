from rest_framework import serializers
from leave.models import LeaveRequest,LeaveProcess,SupervisorQuery
from leave.serializers import LeaveTypeSerializer

class LeaveRequestSerializerEmp(serializers.ModelSerializer):
    type = LeaveTypeSerializer(read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = LeaveRequest
        fields = '__all__'

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