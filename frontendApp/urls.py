from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="myAssistants"),
    path('myAssistants/', views.home, name="myAssistants"),
    path('newAssistant/', views.new_assistant, name="newAssistant"),
    path('assistant/<int:id>', views.story, name="story"),
    path('login/', views.user_login, name='login'),
    path('register/', views.user_register, name='register'),
    path('logout/', views.user_logout, name='logout'),
    ]