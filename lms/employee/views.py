from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from auth.authentication import JWTAuth
from core.models import User
from leave.models import LeaveRequest,LeaveProcess,SupervisorQuery
from leave.serializers import LeaveRequestCreateSerializer
from .serializers import LeaveRequestSerializerEmp,LeaveProcessSerializerEmp,SupervisorQuerySerializerEmp
from core.serializers import UserSerializer



# Create your views here.
class LeaveRequestsAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user:User = request.user
        leave_requests = user.leave_requests

        queries = user.supervisor_queries_received.filter().all()

        return Response({ 
            "user": UserSerializer(user).data,
            "requests": LeaveRequestSerializerEmp(leave_requests, many=True).data,
            "queries": SupervisorQuerySerializerEmp(queries, many=True).data
            })
    
    def post(self, request):
        data = request.data 
        leave_request = LeaveRequestCreateSerializer(data=data)
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
            "days_pending_approval": 3
        })

class LeavePatternAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated] 

    def get(self, request):
        user = request.user
        leave_requests = LeaveRequest.objects.filter(requested_by=user, status='APPR', closed=False).all()
        
        pattern = { "Jan": 2, "Feb": 3, "Mar": 0, "Apr": 2, "May": 0, "Jun": 0, "Jul": 0, "Aug": 0, "Sep": 0, "Oct": 0, "Nov": 0, "Dec": 0 }
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        for lr in leave_requests:
            # Get months
            days = (lr.end_time - lr.start_time).days + 1
            start_month = lr.start_time.month
            end_month = lr.end_time.month

            # Get number of days per month
            
            # update pattern
            pattern[months[start_month]] = days 

        return Response(pattern)

class LeaveDeleteAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated] 

    def delete(self,request, pk):
        user = request.user
        leave = LeaveRequest.objects.get(pk=pk)

        if leave.requested_by != user:
            return Response({'detail':'Not allowed'}, status=status.HTTP_403_FORBIDDEN)
        
        if (leave.closed):
            return Response({'detail': 'Leave already closed'}, status=status.HTTP_400_BAD_REQUEST)
        
        leave.closed = True 
        leave.save()
        return Response(LeaveRequestSerializerEmp(leave).data, status=status.HTTP_202_ACCEPTED)