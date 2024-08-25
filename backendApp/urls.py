# api/urls.py
from django.urls import include, path

from backendApp.views import create_new_assistant

urlpatterns = [
    path('submit_assistant_form', create_new_assistant.as_view(), name='submit_assistant_form'),
]