<script setup>
import { ref, onBeforeMount } from 'vue';
import { client } from '../services/client';
import ReportCard from '../components/ReportCard.vue';
import ReportStatChip from '../components/ReportStatChip.vue';
import contactTrace from '../assets/contact_trace.svg'
import leaveReport from '../assets/leave_report.svg'

const overview = ref({
    total_employees: 0,
    employees_on_leave: 0,
    used_leave_days: 0,
    remaining_leave_days: 0
})

const weekly_employee_details = ref({
    birthdays: 1,
    pending_leave: 2,
    days_used: 1,
    days_left: 4
})

onBeforeMount(() => {
    client.get('/hr/report/leave-overview')
        .then(res => {
            overview.value = res.data
        })
})

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
                <ReportStatChip item="Number of employees" :count="overview.total_employees" />
                <ReportStatChip item="Employees on leave" :count="overview.employees_on_leave" />
                <ReportStatChip item="Leave days used" :count="overview.used_leave_days" />
                <ReportStatChip item="Days left" :count="overview.remaining_leave_days" />
            </div>
        </ReportCard>

        <ReportCard title="Employee details">
            <div class="grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-8">
                <ReportStatChip item="Birthdays" :count="weekly_employee_details.birthdays" />
                <ReportStatChip item="Pending leave" :count="weekly_employee_details.pending_leave" />
                <ReportStatChip item="Leave days used" :count="weekly_employee_details.days_used" />
                <ReportStatChip item="Days left" :count="weekly_employee_details.days_left" />
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