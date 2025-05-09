<script setup>
import { ref, watch } from 'vue';
import { client } from '../services/client';
import { toast } from 'vue3-toastify';
import { formatName } from '../utils';
import Modal from './Modal.vue';
import FormField from './FormField.vue';
import DropDownField from './DropDownField.vue'

const emit = defineEmits(['close-modal'])

const { show } = defineProps({
    show: Boolean,
})

const departments = ref([])
const employees = ref([])
const company = ref({})

const departmentHead = ref(null)
const deparmentName = ref('')
const minEmployees = ref(1)

watch(() => show, (val) => {
    if (!val) return
    client.get('/company/employees')
        .then(({ data }) => {
            employees.value = data.employees
            company.value = data.company
        })
        .catch(e => {
            toast.error(`Error getting employees\n${e.response?.data.detail || e.message}`, { position: toast.POSITION.TOP_CENTER })
        })

    client.get('/company/departments')
        .then(({ data }) => {
            departments.value = data
        })
        .catch(e => {
            toast.error(`Error getting departments\n${e.response?.data.detail || e.message}`, { position: toast.POSITION.TOP_CENTER })
        })
})

const addDepartment = () => {
    const payload = {
        company: company.value.id,
        "min_active_employees": minEmployees.value,
        head: departmentHead.value
    }
}

</script>
<template>
    <Modal :show="show" title="Enter department details" @close-modal="emit('close-modal')">
        <form method="post" @submit.prevent="addDepartment">
            <div class="flex flex-col">
                <h4 class="text-2xl font-semibold mb-6">{{ company.name }}</h4>
                <FormField label="Department name" name="department-name" v-model="deparmentName" />
                <DropDownField label="Head of department" v-model="departmentHead"
                    :options="employees.map(e => ({ value: e.id, label: formatName(e) }))" />
                <FormField label="Mininum number of active employees" v-model="minEmployees" type="number" />
                <p class="font-semibold mt-4">Existing departments</p>
                <ol class="border-1 border-gray-100 list-inside list-decimal p-2 rounded-md bg-teal-50">
                    <li v-for="d in departments">{{ d.name }}</li>
                </ol>
                <div class="flex justify-center">
                    <button>Add</button>
                </div>
            </div>
        </form>
    </Modal>
</template>