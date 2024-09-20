from openai import OpenAI
import config
import os
from backendApp.models import ChatMessage


class MessageService:
    def __init__(self):
        pass

    def createNewMessage(self, message, role, assistantId, context = 'teach'):
        obj = ChatMessage()
        obj.role = role
        obj.content = message
        obj.assistantId = assistantId
        obj.context = context
        obj.save()
        return obj