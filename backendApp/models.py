from django.db import models

# Create your models here.
class Assistant(models.Model):
    gender = models.CharField(max_length=200, blank=True)
    name = models.CharField(max_length=200, blank=True)
    mainGoals = models.CharField(max_length=200, blank=True)
    type = models.CharField(max_length=5000, blank=True)
    language = models.CharField(max_length=5000, blank=True)
    ownerId = models.CharField(max_length=200, blank=True)

class ChatMessage(models.Model):
    assistantId = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    content = models.CharField(max_length=500000)
    context = models.CharField(max_length=200)

class KnowledgeBaseInformation(models.Model):
    assistantId = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    content = models.CharField(max_length=500000)