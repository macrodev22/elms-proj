from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser

# Create your models here.
class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    