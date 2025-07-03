from django.utils import timezone
from rest_framework.serializers import ModelSerializer 
from rest_framework import serializers
from core.serializers import UserMinimalSerializer
from core.models import User
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

    def validate(self, attrs):
        start_time = attrs.get('start_time')
        end_time = attrs.get('end_time')
        errors = { }
        if start_time >= end_time:
            errors['start_time'] = 'Start date and time must be before end date and time'
            errors['end_time'] = 'End date and time must be after start date and time'
        
        now = timezone.now()
        if start_time < now:
            errors['start_time'] = 'Start date and time can not be in the past'

        # Maternity and paternity leaves
        leave_type:LeaveType = attrs.get('type')
        user:User = attrs.get('requested_by')

        if leave_type.name == 'Maternity Leave':
            if user.gender != 'F':
                errors.setdefault('type', [])
                errors['type'].append('Only a woman can take maternity leave')

        if leave_type.name == 'Paternity Leave':
            if user.gender != 'M':
                errors.setdefault('type', [])
                errors['type'].append('Only a man can take paternity leave')
            
        
        if errors:
            raise serializers.ValidationError(errors)
        return attrs

    class Meta:
        model = LeaveRequest
        fields = '__all__'     

class SupervisorQuerySerializer(ModelSerializer):
    sent_by = UserMinimalSerializer(read_only=True)
    sent_to = UserMinimalSerializer(read_only=True)

    class Meta:
        model = SupervisorQuery
        fields = '__all__'
