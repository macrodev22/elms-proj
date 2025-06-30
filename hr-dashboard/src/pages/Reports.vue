<script setup>
import { ref, onBeforeMount, onMounted, computed } from 'vue';
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

const employee_details = ref({
    departments: 0,
    pending_leave: 0,
    days_used: 0,
    days_left: 0
})

onBeforeMount(() => {
    store.setEmployeeOverview()
})

onMounted(() => {
    client.get('/company/departments')
        .then(({ data }) => {
            employee_details.value.departments = data.length
        })
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
                <ReportStatChip item="Departments" :count="employee_details.departments" />
                <ReportStatChip item="Employees on leave" :count="store.employeeOverview.employees_on_leave" />
                <ReportStatChip item="Used leave days" :count="store.employeeOverview.used_leave_days" />
                <ReportStatChip item="Unused leave days" :count="store.employeeOverview.remaining_leave_days" />
            </div>
        </ReportCard>

        <ReportCard title="Employee details">
            <div class="flex flex-col sm:grid sm:grid-cols-2 sm:grid-rows-2 gap-x-4 gap-y-8">
                <ReportStatChip item="Total employees" :count="company.num_employees" />
                <ReportStatChip item="Registered employees" :count="company.registered_employees" />
                <ReportStatChip item="Upcoming leaves" :count="employee_details.pending_leave" />
                <ReportStatChip item="Duration of upcoming leaves" :count="employee_details.days_left" />
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
