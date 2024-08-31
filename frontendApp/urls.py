from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="myAssistants"),
    path('myAssistants/', views.home, name="myAssistants"),
    path('newAssistant/', views.new_assistant, name="newAssistant"),
    path('assistant/<int:id>', views.assistantPage, name="assistantPage"),
    path('assistant/<int:id>/basicInfoTab', views.basicInfoTab, name="basicInfoTab"),
    path('assistant/<int:id>/knowledgeBaseTab', views.knowledgeBaseTab, name="knowledgeBaseTab"),
    path('assistant/<int:id>/chatAndTeachTab', views.chatAndTeachTab, name="chatAndTeachTab"),
    path('assistant/<int:id>/testChatTab', views.testChatTab, name="testChatTab"),
    path('assistant/<int:id>/historyTab', views.historyTab, name="historyTab"),
    path('login/', views.user_login, name='login'),
    path('register/', views.user_register, name='register'),
    path('logout/', views.user_logout, name='logout'),
    ]
