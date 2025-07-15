from django.urls import path

from .views import LeaveRequestsAPIView,LeaveStatsAPIView,LeaveDeleteAPIView,LeavePatternAPIView,LeaveReportSummaryAPIView,LeaveSupervisorRemark,EmployeesOnLeaveAPIView

urlpatterns = [
    path('leave-requests', LeaveRequestsAPIView.as_view(), name='leave-requests'),
    path('supervisor-remark/<int:pk>', LeaveSupervisorRemark.as_view(), name='supervisor-remark'),
    path('leave-stats', LeaveStatsAPIView.as_view()),
    path('leave-pattern', LeavePatternAPIView.as_view()),
    path('leave/<int:pk>', LeaveDeleteAPIView.as_view()),
    path('reports/summary', LeaveReportSummaryAPIView.as_view()),
    path('on-leave', EmployeesOnLeaveAPIView.as_view()),
]
