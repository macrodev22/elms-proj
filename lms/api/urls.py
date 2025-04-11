from django.urls import path
from .views import CompanyEmployeeView

urlpatterns = [
    path('company/<int:pk>/employees', CompanyEmployeeView.as_view()),
]
