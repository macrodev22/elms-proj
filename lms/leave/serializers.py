from rest_framework.serializers import ModelSerializer 
from .models import LeaveRequest,LeaveProcess,LeaveType

class LeaveRequestSerializer(ModelSerializer):
    class Meta:
        model = LeaveRequest 
        fields = '__all__'
        
class LeaveProcessSerializer(ModelSerializer):
    class Meta:
        model = LeaveProcess 
        fields = '__all__'

class LeaveTypeSerializer(ModelSerializer):
    class Meta:
        model = LeaveType
        fields = '__all__'