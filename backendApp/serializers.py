from rest_framework import serializers

from .models import Assistant

class AssistantFormSerializer(serializers.ModelSerializer):
    def getType(self, obj):
        return obj.type

    def getGender(self, obj):
        return obj.gender
    def getName(self, obj):
        return obj.name

    def getMainGoals(self, obj):
        return obj.mainGoals

    def getOwnerId(self, obj):
        return obj.ownerId

    def getLanguage(self, obj):
        return obj.language

    class Meta:
        model = Assistant
        fields = ['type', 'language', 'type', 'gender', 'name', 'mainGoals']
