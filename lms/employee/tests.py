from django.test import TestCase
from rest_framework import status
from django.urls import reverse
from rest_framework.test import APITestCase
from company.models import Company
from leave.models import LeaveRequest,LeaveType
from django.contrib.auth import get_user_model
from django.utils import timezone


User = get_user_model()

# Create your tests here.
class EmployeeLeaveRequests(APITestCase):
    
    def setUp(self):
        # Create a test company
        self.company = Company.objects.create(name="Test Company")
                
        # Create a test employee user
        self.employee = User.objects.create(email="test@example.com",
                                            first_name="Test",
                                            last_name="User",
                                            gender="F",
                                            company=self.company
                                            )
        self.employee.set_password("testpassword123")
        self.employee.save()
        
        # create leave requests for user
        personal_leave = LeaveType.objects.create(name="Personal Leave")
        sick_leave = LeaveType.objects.create(name="Sick Leave")
        now = timezone.now()

        self.leave_requests = []
        self.leave_requests.append(
            LeaveRequest.objects.create(
                requested_by=self.employee,
                reason = "Just to test the app",
                type = personal_leave,
                company = self.company,
                start_time = now + timezone.timedelta(days=2),
                end_time = now + timezone.timedelta(days=6)
            )
        )

        self.leave_requests.append(
            LeaveRequest.objects.create(
                requested_by=self.employee,
                reason = "Just to test the app again",
                type = sick_leave,
                company = self.company,
                start_time = now + timezone.timedelta(days=4),
                end_time = now + timezone.timedelta(days=8)
            )
        )

        # authenticate as test employee user
        response = self.client.post(reverse('login'), {
                             "email": "test@example.com",
                             "password": "testpassword123"
                         }, format='json')

        self.token = response.data['token']
        self.client.credentials(HTTP_Authorization = f"Bearer {self.token}")

        self.url = reverse('leave-requests')
        
    
    def test_employee_can_view_their_leave_requests(self):
        """
        GET: An employee can view their leave requests and supervisor queries
        """
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertIn("requests", response.data, "Leave requests must be returned in response")
        self.assertIn("queries", response.data, "Employee queries must be returned")
        self.assertIn("user", response.data, "User details must be returned")

        # number of requests
        self.assertEqual(len(response.data['requests']), 2)
    
    def test_employee_can_make_leave_request(self):
        """
        Test POST: Employee can create new leave requests
        """
        payload = {
            "type": 1,
            "start_time": timezone.now() + timezone.timedelta(days=4),
            "end_time": timezone.now() + timezone.timedelta(days=10),
            "reason": "To catch some fresh air"
        }

        response = self.client.post(reverse('leave-requests'), payload)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

