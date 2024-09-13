from openai import OpenAI
import config
import os
from backendApp.models import ChatMessage


class ChatGptService:
    def __init__(self):
        if(os.environ.get('CHAT_GPT_API_KEY') is not None):
            API_KEY_OPEN_AI = os.environ.get('CHAT_GPT_API_KEY')
        else:
            API_KEY_OPEN_AI = 'xxxx'
            # config.CHAT_GPT_API_KEY

        self.client = OpenAI(
            api_key=API_KEY_OPEN_AI
        )
        self.chatMessages = []

    def askQuestionToChatGpt(self, recognizedText):
        self.chatMessages.append({"role": 'user', "content": recognizedText})
        for message in self.chatMessages:
            print(f' message from chat {message}')

        responseFromChat = self.sendMessageToChatGpt()
        print(f' response from chat {responseFromChat}')
        self.chatMessages.append({"role": 'assistant', "content": responseFromChat})
        return responseFromChat

    def askChatForSummary(self, assistantId):
        self.injectStoryOfTalkWithRobot(assistantId)
        messageToChat = ('Wyciągnij wnioski z rozmowy i podsumuj mi krótko najwazniejsze informacje z naszej rozmowy,'
                         ' jako informację, które Ci podałem'
                         ' abyś w przyszłości mógł czerpać z takiej notatki więdze. Może mieć to formę minutek ze spotkania. '
                         'Treść podsumowania musisz zamieść w tagu <summary> i zamknij tagie </summary>'
                         'A w osobnym tagu nadaj też temu podsumowaniu tytuł, tytuł musi mówić o czym była rozmowa '
                         'i zamieść ten tytuł w tagu <title> i zamknij za pomocą tagu </title>.'
                         'Podsumowanie ma być krótkie i dokładne, może być nawet wymieniem najważniejszych informacji')

        self.chatMessages.append({"role": 'user', "content": messageToChat})
        responseFromChat = self.sendMessageToChatGpt()

        self.chatMessages.append({"role": 'assistant', "content": responseFromChat})
        return responseFromChat

    def sendMessageToChatGpt(self):
        chat_completion = self.client.chat.completions.create(
            messages=self.chatMessages,
            model="gpt-4o",
        )
        # print(chat_completion)
        responseFromChat = chat_completion.choices[0].message.content
        return responseFromChat

    def injectStoryOfTalkWithRobot(self, assistantId):
        print(assistantId)
        for message in ChatMessage.objects.filter(assistantId=assistantId):
            print(f'@@@MAGAR {message}')
            self.chatMessages.append({"role": message.role, "content": message.content})


