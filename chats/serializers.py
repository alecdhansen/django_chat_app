from rest_framework import serializers
from .models import Room, Message


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"


class MessageSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="author.username")

    class Meta:
        model = Message
        fields = "__all__"
