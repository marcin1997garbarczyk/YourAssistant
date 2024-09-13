from openai import OpenAI
import config
import os
from backendApp.models import KnowledgeBaseInformation


class KnowledgeBaseService:
    def __init__(self):
        pass


    def convertChatSummaryToKnowledgeInfomration(self, assistantId, responseFromChat):
        print(f'Odpowiedz z chatu {responseFromChat}')
        title = self.getTextFromTag(responseFromChat, '<title>', '</title>')
        summary =self.getTextFromTag(responseFromChat, '<summary>', '</summary>')
        print(f'Title {title}')
        print(f'Summary {summary}')
        newObj = self.addNewInformationToKnolwedgeBase(assistantId, title, summary)
        return newObj

    def addNewInformationToKnolwedgeBase(self, assistantId, title, information):
        obj = KnowledgeBaseInformation()
        obj.title = title
        obj.content = information
        obj.assistantId = assistantId
        obj.save()
        return obj

    def getTextFromTag(self, text, startTag, endTag):
        titleStartIndex = text.index(startTag)
        titleEndIndex = text.index(endTag)
        textFromTag = '---'
        if(titleStartIndex >-1 and titleEndIndex > -1):
            textFromTag = text[titleStartIndex + len(startTag): titleEndIndex]
        return textFromTag
