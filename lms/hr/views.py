from datetime import datetime
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.views import APIView
from auth.authentication import JWTAuth
from rest_framework.permissions import IsAuthenticated
from auth.permissions import IsHR
from rest_framework import parsers,status
from core.models import User
from core.serializers import UserSerializer
from leave.models import LeaveRequest,LeaveType
from company.models import Company
from .serializers import LeaveRequestSerializer

# Create your views here.
class CreateEmployeeAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated, IsHR]
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
    permission_classes = [IsAuthenticated, IsHR]

    def get(self, request):
        company = request.user.company
        leaves = LeaveRequest.objects.filter(company=company).all()
        return Response(LeaveRequestSerializer(leaves, many=True).data)



class LeaveOverviewReportAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated, IsHR]

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
    permission_classes = [IsAuthenticated, IsHR] 

    def get(self, request):
        company = request.user.company
        leave_types = LeaveType.objects.all()

        today = datetime.now()
        year_start = datetime(today.year, 1,1)
        year_end = datetime(today.year, 12, 31)

        total_requests = LeaveRequest.objects.filter(company=company, start_time__gte=year_start, end_time__lte=year_end).count()
            
        leave_types_stats = []

        for lt in leave_types:

            leave_types_stats.append({
                "id": lt.id,
                "type": lt.name,
                "description": lt.description,
                "request_count": LeaveRequest.objects.filter(type=lt,company=company, start_time__gte=year_start, end_time__lte=year_end).count(),
                "total_requests": total_requests
            })


        return Response(leave_types_stats)
    
class TeamAvailabilityAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated, IsHR]

    def get(self, request):
        company = request.user.company
        employees = User.objects.filter(company=company)
        today = datetime.now()
        
        availability = []

        for employee in employees:
            leave = LeaveRequest.objects.filter(company=company, requested_by=employee, start_time__lte=today, end_time__gte=today, status="APPR").first()

            availability.append({
             "leave_type": None if leave is None else leave.type.name,
             "available": True if (leave is None) else False,
             "employee": UserSerializer(employee, context={ 'request': request }).data,
            })

        return Response(availability)
    
class FullEmployeeReportAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated, IsHR]

    def get(self, request):
        result = []
        company = request.user.company

        employees = User.objects.filter(company=company)

        for em in employees:
            today = timezone.now()
            year_start = datetime(today.year, 1,1)
            year_end = datetime(today.year, 12,31)
            leave_requests = LeaveRequest.objects.filter(company=company, requested_by=em, start_time__gte=year_start, end_time__lte=year_end)

            used_leave_days = 0
            for lr in leave_requests:
                if lr.start_time >= today:
                    continue
                if lr.status != 'APPR':
                    continue
                duration = lr.end_time - lr.start_time
                days = duration.days
                used_leave_days += days


            result.append({ 
                "employee": UserSerializer(em, context={'request': request}).data,
                "used_leave_days": used_leave_days,
                "leave_requests": LeaveRequestSerializer(leave_requests, many=True).data,
                })

        return Response(result)