from django.urls import path
from .views import RegisterAPIView,LoginAPIView,AuthenticatedUserAPIView,LogoutAPIView,ProfileAPIView

urlpatterns = [
    path('register', RegisterAPIView.as_view()),
    path('login', LoginAPIView.as_view()),
    path('user', AuthenticatedUserAPIView.as_view()),
    path('logout', LogoutAPIView.as_view()),
    path('profile', ProfileAPIView.as_view()),
]