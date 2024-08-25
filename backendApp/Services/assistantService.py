from backendApp.models import Assistant


class AssistantService:

    def __init__(self):
        pass

    def createNewAssistant(self, serializer, userId = 1):
        obj = Assistant()
        obj.language = serializer.data.get('language')
        obj.type = serializer.data.get('type')
        obj.gender = serializer.data.get('gender')
        obj.ownerId = userId
        obj.name = serializer.data.get('name')
        obj.mainGoals = serializer.data.get('mainGoals')
        obj.save()
        return obj