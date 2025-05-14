from django.shortcuts import render
from django.http import HttpResponse
from pathlib import Path
from core.models import User
from auth.authentication import JWTAuth

def render_dashboard(static_path:str):
    def handler(req):
        index_file_path = Path(__file__).resolve().parent / "static" /  static_path
        with open(index_file_path, 'r', encoding='utf-8') as f:
            html = f.read()
            return HttpResponse(html)
    return handler

# Create your views here.
def home(req):
    return render(req, template_name='index.html')

def login(req):
    if req.method == 'GET':
        return render(req, template_name="login.html")
    
    elif req.method == 'POST':
        data = req.POST 

        if not data.get('email') or not data.get('password'):
            return render(req, "login.html", context={ "errors": ["Email and password are required"] })
        user = User.objects.filter(email=data.get('email')).first()

        if not user:
            return render(req, "login.html", context={ "errors": ["No user with this username/password"] })
        if not user.check_password(data.get('password')):
            return render(req, "login.html", context={ "errors": ['Wrong credentials!🥲'] })

        if user.role == 'EM':
            # TODO add auth and redirect to employee
            token = JWTAuth.generate_token(user.id)
            response = render_dashboard("employee_dashboard/index.html")(req)
            response.set_cookie('token', token)
            return response
        
        elif user.role == 'HR':
            # TODO add auth and redirect to hr
            return render_dashboard("hr_dashboard/index.html")(req)
        else:
            return render(req, "login.html", context={ "errors": ['This user can not log in from here. Use admin panel'] })
        
def hr_dashboard(req):
    index_file_path = Path(__file__).resolve().parent / "static" / "hr_dashboard" / "index.html"
    with open(index_file_path, 'r', encoding='utf-8') as file:
        return HttpResponse(file.read())
    
def employee_dashboard(req):
    index_file_path = Path(__file__).resolve().parent / "static" / "employee_dashboard" / "index.html"
    with open(index_file_path, 'r', encoding='utf-8') as f:
        return HttpResponse(f.read())