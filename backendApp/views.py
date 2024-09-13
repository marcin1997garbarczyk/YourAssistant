from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .Services.knowledgeBaseService import KnowledgeBaseService
from .Services.assistantService import AssistantService
from .Services.chatGptService import  ChatGptService
from .Services.messageService import  MessageService
from .models import Assistant, ChatMessage, KnowledgeBaseInformation
from .serializers import AssistantFormSerializer
from django.forms.models import model_to_dict

# Create your views here.

assistantService = AssistantService()
chatGptService = ChatGptService()
messageService = MessageService()
knowledgeBaseService = KnowledgeBaseService()

class create_new_assistant(APIView):
    def post(self, request, format=None):
        serializer = AssistantFormSerializer(data=request.data)

        if(serializer.is_valid()):
            try:
                newAssistantObj = assistantService.createNewAssistant(serializer)
                return Response({'assistantId': newAssistantObj.pk}, status=status.HTTP_201_CREATED, content_type='application/json')
            except(TypeError, ValueError, OverflowError, Assistant.DoesNotExist):
                return Response({'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class get_my_assistants(APIView):
    def get(self, request, format=None):
        collectionOfStory = Assistant.objects.filter(ownerId = request.user.id).values()
        return Response({'assistants': collectionOfStory},
                        status=status.HTTP_200_OK, content_type='application/json')



class get_teach_messages(APIView):
    def get(self, request, id, format=None):
        collectionOfMessages = ChatMessage.objects.filter(assistantId=id).values()
        assistant = Assistant.objects.filter(id=id).values()
        print(collectionOfMessages)
        print(assistant)

        if not collectionOfMessages:
            messageService.createNewMessage('Cześć, czego dziś mnie nauczysz?', 'assistant', id)
            collectionOfMessages = ChatMessage.objects.filter(assistantId=id).values()

        return Response({'messages': collectionOfMessages, 'assistant': assistant},
                        status=status.HTTP_200_OK, content_type='application/json')

class get_knowledge_base(APIView):
    def get(self, request, id, format=None):
        collectionOfKnowledgeBase = KnowledgeBaseInformation.objects.filter(assistantId=id).values()
        assistant = Assistant.objects.filter(id=id).values()
        print(collectionOfKnowledgeBase)
        print(assistant)

        return Response({'knowledgeInformations': collectionOfKnowledgeBase, 'assistant': assistant},
                        status=status.HTTP_200_OK, content_type='application/json')


class submit_answer_from_user(APIView):
    def post(self, request, format=None):
        dataFromRequest = request.data
        print(f'data from request {dataFromRequest}')

        try:
            chatGptService.injectStoryOfTalkWithRobot(dataFromRequest.get('assistantId'))
            answerFromChat = chatGptService.askQuestionToChatGpt(dataFromRequest.get('answer'))
            messageService.createNewMessage(dataFromRequest.get('answer'), 'user', dataFromRequest.get('assistantId'))
            messageService.createNewMessage(answerFromChat, 'assistant', dataFromRequest.get('assistantId'))
            print('Odpowiedz z chatu : '+answerFromChat)
            return Response({'message': answerFromChat, 'assistantId': dataFromRequest.get('assistantId')},
                            status=status.HTTP_201_CREATED, content_type='application/json')
        except(TypeError, ValueError, OverflowError):
            print('EXECPTION 1')
            return Response({'message': 'Error Exist'}, status=status.HTTP_400_BAD_REQUEST)

class reset_chat(APIView):
    def post(self, request, format=None):
        dataFromRequest = request.data
        print(f'data from request {dataFromRequest}')
        ChatMessage.objects.filter(assistantId=dataFromRequest.get('assistantId')).delete()

        try:
            return Response({'success': 'true', 'assistant': dataFromRequest.get('assistantId')},
                            status=status.HTTP_200_OK, content_type='application/json')

        except(TypeError, ValueError, OverflowError):
            print('EXECPTION 1')
            return Response({'message': 'Error Exist'}, status=status.HTTP_400_BAD_REQUEST)


class convert_chat_to_knowledge(APIView):
    def post(self, request, format=None):
        dataFromRequest = request.data
        print(f'data from request {dataFromRequest}')
        try:
            responseFromChat = chatGptService.askChatForSummary(dataFromRequest.get('assistantId'))
            print(f'responseFromChat {responseFromChat}')
            knowledgeSummary = knowledgeBaseService.convertChatSummaryToKnowledgeInfomration(dataFromRequest.get('assistantId'), responseFromChat)
            print(f'know summary {knowledgeSummary.content}')
            ChatMessage.objects.filter(assistantId=dataFromRequest.get('assistantId')).delete()
            return Response({'success': 'true', 'content': knowledgeSummary.content, 'title':knowledgeSummary.title, 'assistant': dataFromRequest.get('assistantId')},
                            status=status.HTTP_200_OK, content_type='application/json')

        except(TypeError, ValueError, OverflowError):
            print('EXECPTION 1')
            return Response({'message': 'Error Exist'}, status=status.HTTP_400_BAD_REQUEST)

