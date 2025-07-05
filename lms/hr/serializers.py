from rest_framework import serializers
from leave.models import LeaveRequest,LeaveProcess,SupervisorQuery
from leave.serializers import LeaveTypeSerializer,SupervisorQuerySerializer
from core.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ['first_name', 'middle_name', 'last_name', 'email', 'profile_picture']

class LeaveRequestSerializer(serializers.ModelSerializer):
    type = LeaveTypeSerializer(read_only=True)
    requested_by = UserSerializer(read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    supervisor_remarks = serializers.SerializerMethodField()
    hr_remarks = serializers.SerializerMethodField()
    supervisor = serializers.SerializerMethodField()
    duration = serializers.SerializerMethodField()

    class Meta:
        model = LeaveRequest 
        fields = '__all__'
        
    def get_hr_remarks(self, obj:LeaveRequest):
        leave_processes = LeaveProcess.objects.filter(leave_request=obj).order_by('-created_at')

        remarks = [
            {"message": lp.remarks, "action": lp.action_taken, "date": lp.created_at, "user": UserSerializer(lp.processed_by).data}
              for lp in leave_processes if (lp.remarks and lp.action_taken != 'SEND')]
        return remarks 
    
    def get_supervisor_remarks(self, obj:LeaveRequest):
        supervisor_queries = SupervisorQuery.objects.filter(leave_request=obj)

        serializer = SupervisorQuerySerializer(supervisor_queries, many=True)
        return serializer.data
    
    def get_supervisor(self, obj:LeaveRequest):
        user = obj.requested_by
        user_supervisor = user.supervised_by
        if user_supervisor is None:
            if user.department is not None and user.department.head is not None:
                user_supervisor = user.department.head
        serializer = UserSerializer(user_supervisor)
        return serializer.data
    
    def get_duration(self, obj:LeaveRequest):
        return obj.duration