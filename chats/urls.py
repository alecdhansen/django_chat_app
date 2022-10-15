from django.urls import path

from .views import (
    RoomListAPIView,
    MessageListAPIView,
    RoomDetailAPIView,
    MessageDetailAPIView,
)


urlpatterns = [
    # path("messages/<int:pk>/", MessageDetailAPIView.as_view()),
    # path("messages/", MessageListAPIView.as_view()),
    path("rooms/", RoomListAPIView.as_view()),
    path("rooms/<int:pk>/", RoomDetailAPIView.as_view()),
    path("rooms/<int:room>/messages/", MessageListAPIView.as_view()),
    path(
        "rooms/<int:room>/messages/<int:pk>/",
        MessageDetailAPIView.as_view(),
    ),
]
