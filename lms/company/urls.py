from django.urls import path
from .views import CompanyEmployeesAPIView,CompanyListCreateAPIView,CompanyDepartmentsAPIView

urlpatterns = [
    path('', CompanyListCreateAPIView.as_view()),
    path('employees', CompanyEmployeesAPIView.as_view()),
    path('departments', CompanyDepartmentsAPIView.as_view()),
]
