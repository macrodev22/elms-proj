from django.urls import path
from .views import CompanyEmployeesAPIView

urlpatterns = [
    path('employees', CompanyEmployeesAPIView.as_view()),
]
