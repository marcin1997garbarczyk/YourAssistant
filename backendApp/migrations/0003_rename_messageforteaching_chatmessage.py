# Generated by Django 5.0.6 on 2024-09-12 12:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backendApp', '0002_messageforteaching'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='MessageForTeaching',
            new_name='ChatMessage',
        ),
    ]
