from django.contrib import admin

from backendApp.models import Assistant, ChatMessage, KnowledgeBaseInformation


@admin.register(Assistant)
class AssistantAdmin(admin.ModelAdmin):
    list_display = ['pk','language','ownerId','type', 'name', 'gender', 'mainGoals']

@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['pk','role','content','assistantId']

@admin.register(KnowledgeBaseInformation)
class KnowledgeBaseInformationAdmin(admin.ModelAdmin):
    list_display = ['pk','title','content','assistantId']
