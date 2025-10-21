# models.py

from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(max_length=191, unique=True)  # ✅ safe for utf8mb4
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username


class Departments(models.Model):
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE,blank=True,null=True)
    name = models.TextField(blank=True,null=True)
    image = models.ImageField(upload_to='images/')
    lead = models.TextField(blank=True,nu)