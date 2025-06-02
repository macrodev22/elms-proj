from django.shortcuts import render
from django.http import HttpResponse
from pathlib import Path
from django.db import IntegrityError
from core.models import User
from company.models import Company
from auth.authentication import JWTAuth

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