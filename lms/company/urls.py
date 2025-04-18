from django.urls import path
from .views import CompanyEmployeesAPIView,CompanyListCreateAPIView

urlpatterns = [
    path('', CompanyListCreateAPIView.as_view()),
    path('employees', CompanyEmployeesAPIView.as_view()),
]
