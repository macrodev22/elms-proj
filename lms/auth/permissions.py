from rest_framework.permissions import BasePermission 

class IsHR(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user.is_authenticated and user.role == 'HR'
    
class IsEmployee(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user.is_authenticated and user.role == 'EM'
    