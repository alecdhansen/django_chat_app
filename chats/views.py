from rest_framework import generics
from .models import Room, Message
from .serializers import RoomSerializer, MessageSerializer

# from .permissions import IsAuthorOrReadOnly

# Create your views here.
class RoomAPIView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class MessageListAPIView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer

    # def get_queryset(self):
    #     book = self.kwargs["book"]
    #     return Review.objects.filter(book=book)

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)


class MessageDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    # permission_classes = (IsAuthorOrReadOnly,)
