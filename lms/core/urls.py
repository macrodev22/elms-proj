from django.urls import path,include
from django.views.generic import TemplateView
from .views import get_started,hr_dashboard,employee_dashboard,login,send_reset_password_token

urlpatterns = [
    path('', TemplateView.as_view(template_name="index.html")),
    path('forgot-password', TemplateView.as_view(template_name="forgot_password.html")),
    path('reset-password', send_reset_password_token),
    path('login', login),
    path('start', get_started),
    path('hr', hr_dashboard),
    path('employee', employee_dashboard),
    path('api/auth/', include('auth.urls')),
    path('api/company/', include('company.urls')),
]