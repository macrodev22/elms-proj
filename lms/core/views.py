from django.shortcuts import render
from django.http import HttpResponse
from pathlib import Path

# Create your views here.
def home(req):
    return render(req, template_name='index.html')

def hr_dashboard(req):
    index_file_path = Path(__file__).resolve().parent / "static" / "hr_dashboard" / "index.html"
    with open(index_file_path, 'r', encoding='utf-8') as file:
        return HttpResponse(file.read())
    
def employee_dashboard(req):
    index_file_path = Path(__file__).resolve().parent / "static" / "employee_dashboard" / "index.html"
    with open(index_file_path, 'r', encoding='utf-8') as f:
        return HttpResponse(f.read())