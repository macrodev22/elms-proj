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

// get Departments function

const getDepartments = () => client.get('/company/departments')
        .then(({ data }) => {
            departments.value = data
        })
        .catch(e => {
            toast.error(`Error getting departments\n${e.response?.data.reduce((p,c) => `${p}. ${c}`, '') || e.message}`, { position: toast.POSITION.TOP_CENTER })
        })

watch(() => show, (val) => {
    if (!val) return
    client.get('/company/employees')
        .then(({ data }) => {
            employees.value = data.employees
            company.value = data.company
        })
        .catch(e => {
            toast.error(`Error getting employees\n${e.response?.data.reduce((p,c) => `${p}. ${c}`, '') || e.message}`, { position: toast.POSITION.TOP_CENTER })
        })

    getDepartments()
})

const addDepartment = () => {
    const payload = {
        name: deparmentName.value,
        company: company.value.id,
        "min_active_employees": minEmployees.value,
        head: departmentHead.value
    }

    client.post('/company/departments', payload)
    .then(res => {
        toast.success('Successfully added the department', { position:toast.POSITION.TOP_CENTER, theme:toast.THEME.COLORED, transition:toast.TRANSITIONS.ZOOM })
    })
    .catch(e => {
        toast.error(`Error adding department\n${e.response?.data.reduce((p,c) => `${p}. ${c}`, '') || e.message }`)
    })
    .finally(() => {
        getDepartments()
    })
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
                <FormField label="Mininum number of active employees" v-model="minEmployees" type="number" name="min-employees" />
                <p class="font-semibold mt-4">Existing departments</p>
                <ol class="border-1 border-gray-100 list-inside list-decimal p-2 rounded-md bg-teal-50">
                    <li v-for="d in departments">{{ d.name }}</li>
                </ol>
                <div class="flex justify-center mt-6">
                    <button class="bg-green-500 hover:bg-green-600 rounded-md py-2 px-8 text-white cursor-pointer">Add department</button>
                </div>
            </div>
        </form>
    </Modal>
</template>
