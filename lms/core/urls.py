from django.urls import path
from django.views.generic import TemplateView
from .views import home,hr_dashboard,employee_dashboard

urlpatterns = [
    path('', home),
    path('login', TemplateView.as_view(template_name="login.html")),
    path('start', TemplateView.as_view(template_name="get_started.html")),
    path('hr', hr_dashboard),
    path('employee', employee_dashboard)
]