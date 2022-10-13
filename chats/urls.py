from django.urls import path

from .views import RoomAPIView, MessageListAPIView, MessageDetailAPIView

urlpatterns = [
    # path("messages/<int:pk>/", MessageDetailAPIView.as_view()),
    path("messages/", MessageDetailAPIView.as_view()),
    path("rooms/<int:pk>/messages", MessageListAPIView.as_view()),
    path("rooms/", RoomAPIView.as_view()),
]
