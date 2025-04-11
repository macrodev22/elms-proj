from django.core.management import BaseCommand

from leave.models import LeaveType

leave_types = [
    ('Annual Leave (Holiday Entitlement)', 'A set amount of time off that employees are legally entitled to for vacations or personal relaxation'),
    ('Sick Leave', 'Time off for employees to recover from illness, often paid to ensure they don\'t come to work while unwell'),
    ('Maternity Leave', 'Leave for new mothers, often including both prenatal and postnatal periods'),
    ('Personal Leave', 'Used for personal reasons such as family events or appointments'),
    ('Emergency Leave', 'For unexpected personal emergencies, such as family crises'),
    ('Bereavement Leave', 'Time off following the death of a family member or close friend'),
    ('Sabbatical Leave', 'Extended periods off for personal projects, research, or study'),
    ('Public Holidays', 'Days off for national or regional holidays'),
    ('Religious Observance Leave', 'Time off for religious events not recognized as public holidays'),
    ('Military Leave', 'Leave for military service or training'),
    ('Short Leave', 'Typically a half-day or a few hours off for minor personal matters'),
    ('Casual Leave', 'Used for short-term personal needs like attending events or appointments'),
    ('Garden Leave', 'Paid leave during a notice period after resignation, often to prevent access to sensitive information'),
    ('Unpaid Leave', 'Leave without pay, often used when other leave options are exhausted'),
    ('Time Off In Lieu (TOIL)', 'Paid time off in exchange for overtime worked')
]

class Command(BaseCommand):
    help = 'Insert leave types'

    def handle(self, *args, **options):
        self.stdout.write("Adding Leave Types...")
        for type in leave_types:
            leave_type = LeaveType.objects.create(name=type[0], description=type[1])
            leave_type.save()
