from django.urls import path

from .views import LeaveRequestsAPIView,LeaveStatsAPIView,LeaveDeleteAPIView,LeavePatternAPIView

urlpatterns = [
    path('leave-requests', LeaveRequestsAPIView.as_view()),
    path('leave-stats', LeaveStatsAPIView.as_view()),
    path('leave-pattern', LeavePatternAPIView.as_view()),
    path('leave/<int:pk>', LeaveDeleteAPIView.as_view()),
]
