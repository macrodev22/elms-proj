from django.db import models

# Create your models here.
class Company(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    website = models.URLField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_created=True)
    updated_at = models.DateTimeField(auto_now=True)
    num_employees = models.IntegerField(null=True, blank=True)


class Department(models.Model):
    name = models.CharField(max_length=255)
    min_active_employees = models.IntegerField(default=1)
    company = models.ForeignKey(Company, related_name='departments', on_delete=models.CASCADE)