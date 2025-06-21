from django.urls import path

<<<<<<< Updated upstream
from .views import LeaveRequestsAPIView,LeaveStatsAPIView,LeaveDeleteAPIView,LeavePatternAPIView,LeaveReportSummaryAPIView
=======
from .views import LeaveRequestsAPIView,LeaveStatsAPIView
>>>>>>> Stashed changes

urlpatterns = [
    path('leave-requests', LeaveRequestsAPIView.as_view()),
    path('leave-stats', LeaveStatsAPIView.as_view()),
<<<<<<< Updated upstream
    path('leave-pattern', LeavePatternAPIView.as_view()),
    path('leave/<int:pk>', LeaveDeleteAPIView.as_view()),
    path('reports/summary', LeaveReportSummaryAPIView.as_view()),
=======
>>>>>>> Stashed changes
]
