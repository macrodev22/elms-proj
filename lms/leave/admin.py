from django.contrib import admin
from .models import LeaveType,LeaveRequest,LeaveProcess,SupervisorQuery

# Register your models here.
admin.site.register(LeaveType)
admin.site.register(LeaveRequest)
admin.site.register(LeaveProcess)
admin.site.register(SupervisorQuery)