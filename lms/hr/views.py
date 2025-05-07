from datetime import datetime
from rest_framework.response import Response
from rest_framework.views import APIView
from auth.authentication import JWTAuth
from rest_framework.permissions import IsAuthenticated
from rest_framework import parsers,status,generics
from core.models import User
from core.serializers import UserSerializer
from leave.models import LeaveRequest
from company.models import Company
from .serializers import LeaveRequestSerializer

# Create your views here.
class CreateEmployeeAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated]
    parser_classes = [parsers.FormParser, parsers.MultiPartParser]

    def post(self, request):
        user:User = request.user
        data = request.data.copy()
        data['company'] = user.company.id
        data['is_active'] = True
        employee_serializer = UserSerializer(data=data, context={'request': request})

        if employee_serializer.is_valid(raise_exception=True):
            employee_serializer.save()
            return Response({'detail': 'success', "data": employee_serializer.data}, status=status.HTTP_201_CREATED)

class LeaveListAPIView(APIView):
    serializer_class = LeaveRequestSerializer
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        company = request.user.company
        leaves = LeaveRequest.objects.filter(company=company).all()
        return Response(LeaveRequestSerializer(leaves, many=True).data)



class LeaveOverviewReportAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        company:Company = request.user.company
        total_employees = User.objects.filter(company=company).count()
        total_leave_days = total_employees * 21

        today = datetime.now()
        employees_on_leave = LeaveRequest.objects.filter(company=company, status='APPR', start_time__gt=today, end_time__lt=today).count()
        
        done_leaves = LeaveRequest.objects.filter(company=company, end_time__lt=today, status='APPR').all()
        used_leave_days = 0
        for leave in done_leaves:
            duration = leave.end_time - leave.start_time
            days = duration.days
            used_leave_days += days

        return Response({
            "total_employees": total_employees,
            "employees_on_leave": employees_on_leave,
            "used_leave_days":used_leave_days,
            "remaining_leave_days" : total_leave_days - used_leave_days
            }
            )

class LeaveTypeStatsAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated] 

    def get(self, request):
            
        leave_types = [
            {
            "type": "annual",
            "request_count": 5,
            "total_requests": 105
            },
            {"type": 'sick', "request_count": 4, "total_requests": 18 }, 
            {"type": 'personal', "request_count": 7, "total_requests": 18 },
            {"type": 'special', "request_count": 12, "total_requests": 18 },
            {"type": 'short', "request_count": 5, "total_requests": 18 },
            {"type": 'annual', "request_count": 2, "total_requests": 18 }, 
        ]
        return Response(leave_types)