from django.urls import path,include
from . import views

urlpatterns = [
    path('create-employee', views.CreateEmployeeAPIView.as_view()),
    path('leave', views.LeaveListAPIView.as_view()),
    path('report/leave-overview', views.LeaveOverviewReportAPIView.as_view()),
    path('report/leave-type-stats', views.LeaveTypeStatsAPIView.as_view()),
    path('report/team-availability', views.TeamAvailabilityAPIView.as_view()),
    path('report/full-employee-report', views.FullEmployeeReportAPIView.as_view()),
]
