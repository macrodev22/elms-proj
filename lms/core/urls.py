from django.urls import path,include
from django.views.generic import TemplateView
from .views import home,hr_dashboard,employee_dashboard,login

urlpatterns = [
    path('', home),
    path('login', login),
    path('start', TemplateView.as_view(template_name="get_started.html")),
    path('hr', hr_dashboard),
    path('employee', employee_dashboard),
    path('api/auth/', include('auth.urls')),
    path('api/company/', include('company.urls')),
]