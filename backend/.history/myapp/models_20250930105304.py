from django.db import models

class Department(models.Model):
    name = models.CharField(max_length =100)
    students = models.IntegerField()
   
class User(models.Model):
    username = models.CharField(max_length =100)
    password = models.CharField(max_length =100)
    department_id = models.ForeignKey(Departmant,on_delete=models.CASCADE)