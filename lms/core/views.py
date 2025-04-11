from django.shortcuts import render

# Create your views here.
def home(req):
    return render(req, template_name='index.html')

def login(request):
    return render(request, template_name="login.html")

def start(req):
    return render(req, template_name="get_started.html")