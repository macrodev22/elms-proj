from django.db import models
from datetime import time

# Create your models here.
class Company(models.Model):
    name = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    website = models.URLField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    contact = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    num_employees = models.IntegerField(null=True, blank=True)
    work_start_time = models.TimeField(null=True, blank=True, default=time(8,30))
    work_end_time = models.TimeField(null=True, blank=True, default=time(5,30))

    def __str__(self):
        return f"{self.name}"


class Department(models.Model):
    name = models.CharField(max_length=255)
    min_active_employees = models.IntegerField(default=1)
    company = models.ForeignKey(Company, related_name='departments', on_delete=models.CASCADE)
    head = models.ForeignKey('core.User', on_delete=models.PROTECT, related_name='departments_headed', null=True, blank=True)

    def __str__(self):
        return f"{self.name} - {self.company.name}"