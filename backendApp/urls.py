# api/urls.py
from django.urls import include, path

from backendApp.views import create_new_assistant, get_my_assistants, get_teach_messages

urlpatterns = [
    path('submit_assistant_form', create_new_assistant.as_view(), name='submit_assistant_form'),
    path('get_my_assistants', get_my_assistants.as_view(), name='get_my_assistants'),
    path('get_teach_messages/<int:id>', get_teach_messages.as_view(), name='get_teach_messages'),
]