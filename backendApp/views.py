from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .Services.assistantService import AssistantService
from .models import Assistant
from .serializers import AssistantFormSerializer
from django.forms.models import model_to_dict

# Create your views here.

assistantService = AssistantService()

class create_new_assistant(APIView):
    def post(self, request, format=None):
        serializer = AssistantFormSerializer(data=request.data)

        if(serializer.is_valid()):
            try:
                newAssistantObj = assistantService.createNewAssistant(serializer)
                return Response({'storyId': newAssistantObj.pk}, status=status.HTTP_201_CREATED, content_type='application/json')
            except(TypeError, ValueError, OverflowError, Assistant.DoesNotExist):
                return Response({'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
