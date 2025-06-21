<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { client } from '../services/client';
import { useStore } from '../store';
import ReportCard from '../components/ReportCard.vue';
import ReportStatChip from '../components/ReportStatChip.vue';
import contactTrace from '../assets/contact_trace.svg'
import leaveReport from '../assets/leave_report.svg'
import EmployeeFullReportModal from '../components/EmployeeFullReportModal.vue';
// show reports
const store = useStore()
const company = computed(() => store.auth.user.company)

const showEmployeeReport = ref(false)

const weekly_employee_details = ref({
    birthdays: 1,
    pending_leave: 2,
    days_used: 1,
    days_left: 4
})

onBeforeMount(() => {
    store.setEmployeeOverview()
})

</script>
<template>
    <div class="flex flex-col md:grid md:grid-cols-2 md:grid-rows-2 gap-6">
        <ReportCard title="Contact tracing report" @btn-click="console.log('Hahah')">
            <div class="flex flex-col flex-1 items-center justify-center py-2">
                <img :src="contactTrace" alt="trace employee contact image" class="size-[220px]">
                <p class="text-gray-500">Trace potential exposure of employees to unwell colleagues</p>
            </div>
        </ReportCard>

        <ReportCard title="Overview" @btn-click="showEmployeeReport = true">
            <div class="flex flex-col sm:grid sm:grid-cols-2 gap-x-4 gap-y-8">
                <ReportStatChip item="Number of employees" :count="company.num_employees" />
                <ReportStatChip item="Employees on leave" :count="store.employeeOverview.employees_on_leave" />
                <ReportStatChip item="Used leave days" :count="store.employeeOverview.used_leave_days" />
                <ReportStatChip item="Unused leave days" :count="store.employeeOverview.remaining_leave_days" />
            </div>
        </ReportCard>

        <ReportCard title="Employee details">
            <div class="flex flex-col sm:grid sm:grid-cols-2 sm:grid-rows-2 gap-x-4 gap-y-8">
                <ReportStatChip item="Birthdays" :count="weekly_employee_details.birthdays" />
                <ReportStatChip item="Registered employees" :count="company.registered_employees" />
                <ReportStatChip item="Upcoming leaves" :count="weekly_employee_details.pending_leave" />
                <ReportStatChip item="Duration of upcoming leaves" :count="weekly_employee_details.days_left" />
            </div>
        </ReportCard>

        <ReportCard title="Leave management">
            <div class="flex flex-col flex-1 items-center py-2 justify-between">
                <img :src="leaveReport" alt="leave report" class="size-[220px]">
                <p class="text-gray-500">View leave entitlements, approvals and remaining leave</p>
            </div>
        </ReportCard>
        <EmployeeFullReportModal :show="showEmployeeReport" @close-modal="showEmployeeReport = false" />
    </div>
</template>
