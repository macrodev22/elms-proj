from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from auth.authentication import JWTAuth
from core.models import User
from leave.models import LeaveRequest
from leave.serializers import LeaveRequestSerializer
from .serializers import LeaveRequestSerializerEmp
from core.serializers import UserSerializer



# Create your views here.
class LeaveRequestsAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user:User = request.user
        leave_requests = user.leave_requests

        return Response({ 
            "user": UserSerializer(user).data,
            "requests": LeaveRequestSerializerEmp(leave_requests, many=True).data
            })
    
    def post(self, request):
        data = request.data 
        leave_request = LeaveRequestSerializer(data=data)
        if leave_request.is_valid(raise_exception=True):
            leave_request.save()

        return Response(leave_request.data)


class LeaveStatsAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user 

        used_leave = LeaveRequest.objects.filter(requested_by=user.id, closed=True).all()
        serializer = LeaveRequestSerializerEmp(used_leave, many=True)
        return Response({
            "total_leave_days": 21,
            "days_used": 2,
            "days_pending_approval": 19
        })