<template>
    <Modal :show="show" title="Employee Report" @close-modal="emit('close-modal')">
        <h4 class="text-lg font-semibold mb-4 border-b-1 border-b-gray-300">{{ store.auth.user?.company?.name ||
            'Company report' }}</h4>
        <div class="flex flex-col">
            <EmployeeReportItem v-for="ed in employeesData" :key="ed.employee.id" :employee="ed.employee"
                :leave-data="ed.leave_requests" :used-leave-days="ed.used_leave_days" />
        </div>
    </Modal>
</template>

<script setup>
import { useStore } from '../store';
import { client } from '../services/client';
import { watch, ref } from 'vue';
import Modal from './Modal.vue';
import EmployeeReportItem from './EmployeeReportItem.vue';

const store = useStore()
const employeesData = ref([])

const emit = defineEmits(['close-modal'])

const { show } = defineProps({
    show: { type: Boolean, default: false },
})

watch(() => show, (val) => {
    if (val) {
        client.get('/hr/report/full-employee-report')
            .then(({ data }) => {
                employeesData.value = data
            })
    }
})
</script>