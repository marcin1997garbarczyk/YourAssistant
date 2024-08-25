from django.contrib import admin

from backendApp.models import Assistant


@admin.register(Assistant)
class StoryAdmin(admin.ModelAdmin):
    list_display = ['pk','language','ownerId','type', 'name', 'gender', 'mainGoals']
