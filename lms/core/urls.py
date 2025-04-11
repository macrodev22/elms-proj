from django.urls import path
from .views import home,login,start

urlpatterns = [
    path('', home),
    path('login', login),
    path('start', start)
]