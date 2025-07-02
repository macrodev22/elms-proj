from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404

from auth.authentication import JWTAuth
from core.models import User
from leave.models import LeaveRequest,LeaveType,SupervisorQuery
from leave.serializers import LeaveRequestCreateSerializer,LeaveTypeSerializer
from .serializers import LeaveRequestSerializerEmp,LeaveProcessSerializerEmp,SupervisorQuerySerializerEmp
from core.serializers import UserSerializer



# Create your views here.
class LeaveRequestsAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user:User = request.user
        leave_requests = user.leave_requests.order_by('-requested_at')

        queries = user.supervisor_queries_received.order_by('-created_at').filter(supervisor_remarks=None)

        return Response({ 
            "user": UserSerializer(user).data,
            "requests": LeaveRequestSerializerEmp(leave_requests, many=True).data,
            "queries": SupervisorQuerySerializerEmp(queries, many=True).data
            })
    
    def post(self, request):
        user:User = request.user
        data = request.data 
        data['requested_by'] = user.id
        data['company'] = user.company.id
        leave_request = LeaveRequestCreateSerializer(data=data)
        if leave_request.is_valid(raise_exception=True):
            leave_request.save()

        return Response(leave_request.data)
    
class LeaveSupervisorRemark(APIView):
    authentication_classes = [JWTAuth] 
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        remarks = request.data.get("supervisor_remarks", None)
        if remarks is None:
            return Response({"detail": "Supervisor remarks are mandatory"}, status=status.HTTP_400_BAD_REQUEST)
        user:User = request.user
        query:SupervisorQuery = get_object_or_404(SupervisorQuery, pk=pk)
        
        query.supervisor_remarks = remarks
        query.save()
        return Response(SupervisorQuerySerializerEmp(query).data)


class LeaveStatsAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user 
        total_leave_days = 21

        leave_requests = user.leave_requests
        now = timezone.now()

        used_leave = leave_requests.filter(end_time__lte=now, closed=False, status="APPR")
        pending_leave = leave_requests.filter(start_time__gte=now, closed=False, status="PNDG")
        days_used = 0
        days_pending_approval = 0

        for u_l in used_leave:
            days_used += u_l.duration
        for p_l in pending_leave:
            days_pending_approval += p_l.duration
        
        return Response({
            "total_leave_days": total_leave_days,
            "days_used": days_used,
            "days_pending_approval": days_pending_approval
        })

class LeavePatternAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated] 

    def get(self, request):
        user = request.user
        now = timezone.now()
        naive_year_start = timezone.datetime(now.year, 1, 1, 0, 0, 0)
        year_start = timezone.make_aware(naive_year_start, timezone.get_current_timezone())
        naive_year_end = timezone.datetime(now.year, 12,31,23,59,59)
        year_end = timezone.make_aware(naive_year_end, timezone.get_current_timezone())
        leave_requests = LeaveRequest.objects.filter(requested_by=user, start_time__gte=year_start, start_time__lte=year_end)
        
        pattern = { "Jan": 0, "Feb": 0, "Mar": 0, "Apr": 0, "May": 0, "Jun": 0, "Jul": 0, "Aug": 0, "Sep": 0, "Oct": 0, "Nov": 0, "Dec": 0 }
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        for lr in leave_requests:
            # Get months
            days = lr.duration
            start_month = lr.start_time.month - 1
            end_month = lr.end_time.month

            # Get number of days per month
            
            # update pattern
            pattern[months[start_month]] += days 

        return Response(pattern)

class LeaveDeleteAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated] 

    def delete(self,request, pk):
        user = request.user
        leave = LeaveRequest.objects.get(pk=pk)

        if leave.requested_by != user:
            return Response({'detail':'Not allowed'}, status=status.HTTP_403_FORBIDDEN)
        
        # Already taken
        now = timezone.now()
        if leave.end_time <= now and leave.status == 'APPR':
            return Response({ 'detail': 'Not allowed. Leave already past' }, status=status.HTTP_400_BAD_REQUEST)
        
        if (leave.closed):
            return Response({'detail': 'Leave already closed'}, status=status.HTTP_400_BAD_REQUEST)
        
        leave.closed = True 
        leave.save()
        return Response(LeaveRequestSerializerEmp(leave).data, status=status.HTTP_202_ACCEPTED)
    
class LeaveReportSummaryAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user:User = request.user
        now = timezone.now()
        year_start = timezone.datetime(now.year, 1, 1)
        # year_end = timezone.datetime(now.year, 12, 31, 23,59,59)
        leave_requests = user.leave_requests.filter(start_time__gte=year_start)
        types = []
        leave_types = LeaveType.objects.all()
        for l_type in leave_types:
            t = LeaveTypeSerializer(l_type).data
            finished_leaves_t = leave_requests.filter(closed=False, type=l_type, status="APPR", end_time__lte=now)
            days_used = 0
            for f_l in finished_leaves_t:
                days_used += f_l.duration
            t["days_used"] = days_used

            types.append(t)

        result = {
            "employee": UserSerializer(user).data,
            "approved_leave": LeaveRequestSerializerEmp(leave_requests.filter(status="APPR"), many=True).data,
            "pending_leave": LeaveRequestSerializerEmp(leave_requests.filter(status="PNDG"), many=True).data,
            "declined_leave": LeaveRequestSerializerEmp(leave_requests.filter(status='DCLN'), many=True).data,
            "types": types
        }
        return Response(result)
    
class EmployeesOnLeaveAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user:User = request.user
        now = timezone.now()
        leave_today = LeaveRequest.objects.filter(start_time__lte=now, end_time__gte=now, closed=False, status='APPR', company=user.company)
        employees = [l.requested_by for l in leave_today]

        return Response(LeaveRequestSerializerEmp(leave_today, many=True, context={'request': request}).data)
