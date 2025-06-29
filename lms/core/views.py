from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings
from django.http import HttpResponse
from pathlib import Path
from django.db import IntegrityError
from core.models import User
from company.models import Company
from auth.authentication import JWTAuth
from . import utils

def render_dashboard(static_path:str):
    def handler(req):
        index_file_path = Path(__file__).resolve().parent / "static" /  static_path
        with open(index_file_path, 'r', encoding='utf-8') as f:
            html = f.read()
            return HttpResponse(html)
    return handler

# Create your views here.
def get_started(req):
    if req.method == 'GET':
        return render(req, template_name='get_started.html')
    
    elif req.method == 'POST':
        # Register company
        data = req.POST 
        errors = {  }
        company_name = data.get("company_name", None)
        if company_name is None:
            errors['company_name'] = ['Company name is mandatory']
        email = data.get("email", None)
        if email is None:
            errors['email'] = ['Email is mandatory']
        contact = data.get("contact", None)
        if contact is None:
            errors['contact'] = ['Contact is mandatory']
        address = data.get("address", None)
        if address is None:
            errors['address'] = ['Address is mandatory']
        num_employees = data.get("num_employees", None)
        if num_employees is None:
            errors['num_employees'] = ['Number of employees is mandatory']
        else:
            try:
                num_employees = int(num_employees)
            except:
                errors['num_employees'] = ['Number of employees should be a number']
        website = data.get("website", None)

        # Validation
        if not errors:
            # Submit company
            company = Company(name=company_name, email=email, website=website, address=address, contact=contact, num_employees=num_employees)
            try:
                company.save()
                return render(req, template_name="index.html")
            except IntegrityError as e:
                errors['company_name'] = ['The company name must be unique']
                errors['email'] = ['The email must be unique']


        if errors:
            return render(req, template_name="get_started.html", context={ 
                'errors': errors,
                'company_name_value': company_name,
                'email_value': email,
                'contact_value': contact,
                'address_value': address,
                'num_employees_value': num_employees,
                'website_value': website,
                })
        

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
            token = JWTAuth.generate_token(user.id)
            response = render_dashboard("employee_dashboard/index.html")(req)
            response.set_cookie('token', token)
            return response
        
        elif user.role == 'HR':
            token = JWTAuth.generate_token(user.id)
            response = render_dashboard("hr_dashboard/index.html")(req)
            response.set_cookie('token', token)
            return response
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
    
def send_reset_password_token(req):
    if(req.method == 'POST'):
        data = req.POST
        email = data.get('email')
        if email is None:
            return render(req, template_name="forgot_password.html", context={'message': 'Provide a valid email'})
        user = User.objects.filter(email=email).first()
        if user is not None:
            # Generate temp email reset token
            token = JWTAuth.generate_password_reset_token(user.id)
            reset_link = f"{req.scheme}://{req.get_host()}/reset-password/{token}"
            email_message = f"You have requested a password reset.\n\nClick the lick below to reset your password\n\n{reset_link}"
            html_email_message = utils.email_password_reset_link_html(reset_link)
            send_mail("Your password reset link", email_message, settings.DEFAULT_FROM_EMAIL, [user.email], html_message=html_email_message)

        message = f"A password reset link has been sent to {email} if a user with this email exists"

        return render(req,template_name="forgot_password.html", context={'message': message})
    
def reset_password(req, token):
    try:
        user, token_jwt = JWTAuth().authenticate(req)
    except:
        user = None
    
    if user is None:
        return render(template_name="reset_password.html", context={'error': {'has_error': True, 'detail':'The password reset link token is invalid'}})
    else:
        return render(template_name="reset_password.html", context={'error': {'has_error': False, 'detail':''}, 'token': token_jwt})
    