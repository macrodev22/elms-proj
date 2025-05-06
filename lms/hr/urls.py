from django.urls import path,include
from . import views

urlpatterns = [
    path('create-employee', views.CreateEmployeeAPIView.as_view()),
]
