from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from company.models import Company,Department

# Create your models here.
class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)

        # Convert company ID to instance
        company = extra_fields.pop('company')
        if isinstance(company, int):
            company = Company.objects.get(pk=company)
        extra_fields['company'] = company
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('role', 'ADMIN')

        return self.create_user(email, password, **extra_fields)

USER_ROLE_CHOICES = (('HR', 'Human Resource'), ('EM', 'Employee'), ('ADMIN', 'Admin'))

def default_contact():
    return { "mobile":"", "work": "" }

class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True, blank=False, null=False)
    role = models.CharField(max_length=20, choices=USER_ROLE_CHOICES)
    profile_picture = models.ImageField(upload_to="profile_pictures/", null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    company = models.ForeignKey(Company, on_delete=models.PROTECT, related_name='users', null=True, blank=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='employees', null=True, blank=True)
    middle_name = models.CharField(max_length=255, null=True, blank=True)
    supervised_by = models.ForeignKey('core.User', on_delete=models.PROTECT, related_name="subordinates", null=True, blank=True)
    contact = models.JSONField(null=True, blank=True, default=default_contact)
    gender = models.CharField(choices=(('M', 'Male'), ('F', 'Female')))
    designation = models.CharField(max_length=255, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['date_of_birth', 'role', 'company']

    objects = UserManager()

    @property
    def supervisor(self):
        if self.supervised_by != None:
            return self.supervised_by 
        else:
            return self.department.head if self.department is not None else None

    def __str__(self):
        company_name = self.company.name if self.company else "(No company)"
        role = self.role if self.role else 'n/a'
        return f"{self.email} - {company_name} ({role})"