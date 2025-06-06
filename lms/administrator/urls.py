from django.urls import path
from .views import HRCreateAPIView

urlpatterns = [
    path('create-hr', HRCreateAPIView.as_view()),
]
