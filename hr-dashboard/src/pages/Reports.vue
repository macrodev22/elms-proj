<script setup>
import ReportCard from '../components/ReportCard.vue';
import ReportStatChip from '../components/ReportStatChip.vue';
import contactTrace from '../assets/contact_trace.svg'
import leaveReport from '../assets/leave_report.svg'

const report = {
    overview: {
        total_employees: 11,
        employees_on_leave: 3,
        leave_days_used: 45,
        days_left: 186
    },
    weekly_employee_details: {
        birthdays: 1,
        pending_leave: 2,
        days_used: 1,
        days_left: 4
    }
}
</script>
<template>
    <div class="grid grid-cols-2 grid-rows-2 gap-6">
        <ReportCard title="Contact tracing report" @btn-click="console.log('Hahah')">
            <div class="flex flex-col flex-1 items-center justify-center py-2">
                <img :src="contactTrace" alt="trace employee contact image" class="size-[220px]">
                <p class="text-gray-500">Trace potential exposure of employees to unwell colleagues</p>
            </div>
        </ReportCard>

        <ReportCard title="Overview">
            <div class="grid grid-cols-2 gap-x-4 gap-y-8">
                <ReportStatChip item="Number of employees" :count="report.overview.total_employees" />
                <ReportStatChip item="Employees on leave" :count="report.overview.employees_on_leave" />
                <ReportStatChip item="Leave days used" :count="report.overview.leave_days_used" />
                <ReportStatChip item="Days left" :count="report.overview.days_left" />
            </div>
        </ReportCard>

        <ReportCard title="Employee details">
            <div class="grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-8">
                <ReportStatChip item="Birthdays" :count="report.weekly_employee_details.birthdays" />
                <ReportStatChip item="Pending leave" :count="report.weekly_employee_details.pending_leave" />
                <ReportStatChip item="Leave days used" :count="report.weekly_employee_details.days_used" />
                <ReportStatChip item="Days left" :count="report.weekly_employee_details.days_left" />
            </div>
        </ReportCard>

        <ReportCard title="Leave management">
            <div class="flex flex-col flex-1 items-center py-2 justify-between">
                <img :src="leaveReport" alt="leave report" class="size-[220px]">
                <p class="text-gray-500">View leave entitlements, approvals and remaining leave</p>
            </div>
        </ReportCard>
    </div>
</template>