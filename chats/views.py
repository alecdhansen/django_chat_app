from rest_framework import generics
from .models import Room, Message
from .serializers import RoomSerializer, MessageSerializer
from django.shortcuts import get_object_or_404

# from .permissions import IsAuthorOrReadOnly

# Create your views here.
class RoomListAPIView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class RoomDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class MessageListAPIView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        room = self.kwargs["room"]
        return Message.objects.filter(room=room)

    def perform_create(self, serializer):
        room = get_object_or_404(Room, id=self.kwargs["room"])
        serializer.save(room=room, user=self.request.user)


class MessageDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    # permission_classes = (IsAuthorOrReadOnly,)
