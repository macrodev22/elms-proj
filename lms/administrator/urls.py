from django.urls import path
from .views import HRCreateAPIView,CompanyDepartments

urlpatterns = [
    path('create-hr', HRCreateAPIView.as_view()),
    path('company-departments/<int:pk>', CompanyDepartments.as_view()),
]
