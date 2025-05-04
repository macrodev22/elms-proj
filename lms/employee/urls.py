from django.urls import path

from .views import LeaveRequestsAPIView,LeaveStatsAPIView

urlpatterns = [
    path('leave-requests', LeaveRequestsAPIView.as_view()),
    path('leave-stats', LeaveStatsAPIView.as_view()),
]
