from django.urls import path
from .views import ListLeaveTypes

urlpatterns = [
    path('types', ListLeaveTypes.as_view()),
]
