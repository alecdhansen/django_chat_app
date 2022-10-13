from django.db import models
from django.conf import settings

# Create your models here.
class Room(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title[:50]


class Message(models.Model):
    text = models.CharField(max_length=255)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True
    )

    def __str__(self):
        return self.text[:50]
