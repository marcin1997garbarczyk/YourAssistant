from django.db import models

# Create your models here.
class Assistant(models.Model):
    gender = models.CharField(max_length=200, blank=True)
    name = models.CharField(max_length=200, blank=True)
    mainGoals = models.CharField(max_length=200, blank=True)
    type = models.CharField(max_length=5000, blank=True)
    language = models.CharField(max_length=5000, blank=True)
    ownerId = models.CharField(max_length=200, blank=True)