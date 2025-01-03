from django.contrib.auth.models import AbstractUser
from django.db import models


class Patient(AbstractUser):
    phone = models.CharField(max_length=15)

    def __str__(self):
        return self.username

