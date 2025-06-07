from datetime import datetime
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.views import APIView
from auth.authentication import JWTAuth
from rest_framework.permissions import IsAuthenticated
from auth.permissions import IsHR
from rest_framework import parsers,status,exceptions
from core.models import User
from core.serializers import UserSerializer,UserCreateSerializer
from leave.models import LeaveRequest,LeaveType,LeaveProcess,SupervisorQuery
from leave.serializers import LeaveProcessSerializer
from company.models import Company
from company.serializers import CompanySerializer
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
        employee_serializer = UserCreateSerializer(data=data, context={'request': request})

        if employee_serializer.is_valid(raise_exception=True):
            created_user = employee_serializer.save()
            return Response({'detail': 'success', "data": UserSerializer(created_user).data}, status=status.HTTP_201_CREATED)

class LeaveListAPIView(APIView):
    serializer_class = LeaveRequestSerializer
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated, IsHR]

    def get(self, request):
        company = request.user.company
        leaves = LeaveRequest.objects.filter(company=company).all().order_by('-requested_at','start_time')
        return Response(LeaveRequestSerializer(leaves, many=True, context={'request': request}).data)

class MobileDashStatsAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated, IsHR]
    
    def get(self, request):
        user:User = request.user
        company:Company = user.company
        leave_requests = company.leave_requests
        now = timezone.now()
        year_start = timezone.datetime(now.year, 1, 1, tzinfo=now.tzinfo)
        year_end = timezone.datetime(now.year, 12, 31, 23,59,59, tzinfo=now.tzinfo)
        yearly_leave_requests = leave_requests.filter(start_time__gte=year_start, end_time__lte=year_end)
        

        return Response({
            "company": CompanySerializer(company).data,
            "total_employees": company.num_employees if user.company.num_employees is not None else 2,
            "registered_employees": company.users.count(),
            "total_leave_requests": yearly_leave_requests.count(),
            "pending_leave_requests": yearly_leave_requests.filter(status="PNDG").count(),
            "approved_leave_requests": yearly_leave_requests.filter(status="APPR").count(),
            "declined_leave_requests": yearly_leave_requests.filter(status="DCLN").count()
         })


class LeaveOverviewReportAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated, IsHR]

    def get(self, request):
        company:Company = request.user.company
        total_employees = User.objects.filter(company=company).count()
        total_leave_days = total_employees * 21

        today = timezone.now()
        employees_on_leave = LeaveRequest.objects.filter(company=company, status='APPR', start_time__gte=today, end_time__lte=today).count()
        
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
    
class LeaveActionAPIView(APIView):
    authentication_classes = [JWTAuth]
    permission_classes = [IsAuthenticated, IsHR]

    def post(self, request, pk):
        user = request.user
        leave = LeaveRequest.objects.get(pk=pk)
        remarks = request.data.get("remarks", None)
        action = request.data.get("action", None)
        
        if not remarks or not action:
            raise exceptions.ValidationError('Remarks for action are required', code=status.HTTP_400_BAD_REQUEST)
        
        actions = ['Approve', 'Decline', 'Ask Supervisor']
        if action not in actions:
            raise exceptions.ValidationError('invalid action chosen')
        
        action_codes = ['APPR', 'DCLN', 'SEND']
        action_index = actions.index(action)

        action_code = action_codes[action_index]


        # Check if already exists for APPR or DECL
        if action_code != 'SEND':
            existing = LeaveProcess.objects.filter(leave_request=leave, processed_by=user, action_taken=action_code).first()
            if existing is not None:
                raise exceptions.ValidationError(f"{action} action already taken")
        leave_process = LeaveProcess.objects.create(leave_request=leave, processed_by=user, action_taken=action_code, remarks=remarks)

        leave_process.save()
        # Change leave status
        if action_code in ['APPR', 'DCLN']:
            leave.status = action_code
            leave.save()

        # Add Supervisor Query for SEND
        if action_code == 'SEND':
            supervisor = leave.requested_by.supervisor
            supervisor_query = SupervisorQuery.objects.create(sent_by=user, sent_to=supervisor, hr_remarks=remarks, leave_process=leave_process, leave_request=leave)
            supervisor_query.save()

        serializer = LeaveProcessSerializer(leave_process)

        return Response({'detail': f"{action} successful", "leave_process": serializer.data}, status=status.HTTP_201_CREATED)