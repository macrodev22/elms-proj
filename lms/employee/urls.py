from django.urls import path

from .views import LeaveRequestsAPIView

urlpatterns = [
    path('leave-requests', LeaveRequestsAPIView.as_view()),
]
