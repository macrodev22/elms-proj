from rest_framework.serializers import ModelSerializer 
from .models import LeaveRequest,LeaveProcess

class LeaveRequestSerializer(ModelSerializer):
    class Meta:
        model = LeaveRequest 
        fields = '__all__'
        
class LeaveProcessSerializer(ModelSerializer):
    class Meta:
        model = LeaveProcess 
        fields = '__all__'

        