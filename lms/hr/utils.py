from django.core.mail import send_mail
from django.conf import settings

def send_leave_notification(to_email:str, subject:str, message:str, html_message=None):
    send_mail(
        subject=subject,
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[to_email],
        html_message=html_message,
        fail_silently=False
    )