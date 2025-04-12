from django.db import models
from company.models import Company
from core.models import User

LEAVE_STATUS_CHOICES = (('APPR', 'Approved'), ('DCLN', 'Declined'), ('PNDG', 'Pending'), ('CXLD', 'Cancelled'))
LEAVE_PROCESS_ACTION_CHOICES = (('SEND', 'Sent to Supervisor'), ('CLSD', 'Closed'))

# Create your models here.
class LeaveType(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name


class LeaveRequest(models.Model):
    requested_at = models.DateTimeField(auto_now_add=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    status = models.TextField(choices=LEAVE_STATUS_CHOICES, default='PNDG')
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='leave_requests')
    requested_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name='leave_requests')
    type = models.ForeignKey(LeaveType, on_delete=models.PROTECT)
    reason = models.TextField(null=True, blank=True)
    closed = models.BooleanField(default=False, blank=True)

    def __str__(self):
        return f"{self.type.name} - {self.requested_by.email} - {self.company.name}"


class LeaveProcess(models.Model):
    remarks = models.TextField(null=True, blank=True)
    processed_by = models.ForeignKey(User, on_delete=models.PROTECT)
    leave_request = models.ForeignKey(LeaveRequest, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    action_taken = models.CharField(max_length=100, choices=LEAVE_PROCESS_ACTION_CHOICES)

class SupervisorQuery(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sent_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name='supervisor_queries_sent')
    sent_to = models.ForeignKey(User, on_delete=models.PROTECT, related_name='supervisor_queries_received')
    hr_remarks = models.TextField(null=True, blank=True)
    supervisor_remarks = models.TextField(null=True, blank=True)
    closed = models.BooleanField(default=False)
    leave_process = models.ForeignKey(LeaveProcess, on_delete=models.PROTECT)