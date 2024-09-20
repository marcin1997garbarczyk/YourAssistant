# api/urls.py
from django.urls import include, path

from backendApp.views import create_new_assistant, get_assistant_base_info, get_my_assistants,get_test_messages, get_teach_messages, submit_answer_from_user, submit_answer_from_user_test, reset_chat, convert_chat_to_knowledge, get_knowledge_base

urlpatterns = [
    path('submit_assistant_form', create_new_assistant.as_view(), name='submit_assistant_form'),
    path('get_my_assistants', get_my_assistants.as_view(), name='get_my_assistants'),
    path('get_knowledge_base/<int:id>', get_knowledge_base.as_view(), name='get_knowledge_base'),
    path('get_assistant_base_info/<int:id>', get_assistant_base_info.as_view(), name='get_assistant_base_info'),
    path('get_teach_messages/<int:id>', get_teach_messages.as_view(), name='get_teach_messages'),
    path('get_test_messages/<int:id>', get_test_messages.as_view(), name='get_test_messages'),
    path('submit_answer_from_user', submit_answer_from_user.as_view(), name='submit_answer_from_user'),
    path('submit_answer_from_user_test', submit_answer_from_user_test.as_view(), name='submit_answer_from_user_test'),
    path('convert_chat_to_knowledge', convert_chat_to_knowledge.as_view(), name='convert_chat_to_knowledge'),
    path('reset_chat', reset_chat.as_view(), name='reset_chat')
]