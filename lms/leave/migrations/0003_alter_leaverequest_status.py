# Generated by Django 5.2 on 2025-04-11 15:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leave', '0002_leaverequest_leaveprocess_supervisorquery'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leaverequest',
            name='status',
            field=models.TextField(choices=[('APPR', 'Approved'), ('RJCT', 'Rejected'), ('PNDG', 'Pending')], default='PNDG'),
        ),
    ]
