<script setup>
import { reactive, ref, onBeforeMount, watch } from 'vue';
import { client, getCompanyDepartments } from '../services/client'
import { toast } from 'vue3-toastify';
import Modal from './Modal.vue';
import FormField from './FormField.vue';
import DropDownField from './DropDownField.vue';
import SpinnerButton from './SpinnerButton.vue';
import profilePhotoGeneric from '../assets/generic_profile_photo.jpg';


const { show } = defineProps({
    show: { type: Boolean, default: false },
})

const emit = defineEmits(['close-modal'])

const formFields = reactive({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    role: "",
    gender: "",
    profile_picture: null,
    date_of_birth: null,
    department: null,
    password: "defaultpassword"
})

const roles = [
    { value: 'EM', label: 'Employee' },
    { value: 'HR', label: 'Human Resource' },
]

const genders = [
    { value: 'F', label: 'Female' },
    { value: 'M', label: 'Male' },
]

const departments = ref([])

watch(() => show, (val) => {
    if (val) getCompanyDepartments().then(res => {
        departments.value = res.data
    })
})

const form = ref(null)
const profileImg = ref(null)
const photoInput = ref(null)

const isLoading = ref(false)

const onPhotoChange = () => {
    const file = photoInput.value.files[0]
    const fr = new FileReader()

    fr.addEventListener('load', () => {
        profileImg.value.src = fr.result
    })

    fr.readAsDataURL(file)
}

const resetForm = () => {
    formFields.first_name = ""
    formFields.middle_name = ""
    formFields.last_name = ""
    formFields.email = ""
    formFields.department = null
    formFields.gender = ""
    formFields.profile_picture = null
    formFields.role = ""
    formFields.date_of_birth = null
    formFields.password = "defaultpassword"
}

const saveEmployee = () => {
    isLoading.value = true
    // Build form data
    const formData = new FormData(form.value)

    client.postForm('/hr/create-employee', formData)
        .then(res => {
            console.log(res)
            toast.success('Saved employee successfully')

            resetForm()
        })
        .catch(e => {
            console.error(e)
            toast.error(`Error saving employee!\n${e.response?.data.detail || e.message}`, {
                position: toast.POSITION.BOTTOM_CENTER,
            })

        })
        .finally(() => {
            isLoading.value = false
        })
}

</script>

<template>
    <Modal title="Add an Employee" :show="show" @close-modal="emit('close-modal')">
        <form method="post" ref="form" @submit.prevent="saveEmployee" enctype="multipart/form-data">
            <FormField name="first_name" label="First name" v-model="formFields.first_name" />
            <FormField name="middle_name" label="Middle name" :required="false" v-model="formFields.middle_name" />
            <FormField name="last_name" label="Last name" v-model="formFields.last_name" />
            <FormField name="email" label="Email" type="email" v-model="formFields.email" />
            <div class="flex gap-8 items-center mb-4">
                <div class="flex flex-col">
                    <label for="date_of_birth" class="mb-1.5">Date of Birth</label>
                    <input v-model="formFields.date_of_birth" type="date" placeholder="Date of Birth"
                        name="date_of_birth" id="date_of_birth" class="border-2 border-gray-100 rounded-sm px-4 py-1.5">
                </div>
                <div class="flex gap-4">
                    <div class="rounded-full w-26 h-26 overflow-hidden border-gray-200 border-1">
                        <img :src="profilePhotoGeneric" ref="profileImg" alt="profile photo"
                            class="w-full h-full object-cover">
                    </div>
                    <label for="profile_picture" class="mb-1.5 grid place-items-center">
                        <span
                            class="rounded-lg cursor-pointer border-1 border-green-500 py-2 px-5 hover:bg-green-500 hover:text-white">Choose
                            Profile
                            Photo</span>
                    </label>
                    <input type="file" ref="photoInput" @change="onPhotoChange" accept="image/*" id="profile_picture"
                        name="profile_picture" class="hidden">

                </div>
            </div>

            <div class="flex gap-4">
                <DropDownField name="department" label="Department" v-model="formFields.department"
                    :options="departments.map(d => ({ value: d.id, label: d.name }))" />
                <DropDownField label="Role" name="role" :options="roles" v-model="formFields.role" />
                <DropDownField label="Gender" name="gender" :options="genders" v-model="formFields.gender" />
            </div>
            <FormField name="password" label="password" v-model="formFields.password" />
            <div class="flex mb-6 mt-2">
                <SpinnerButton :is-loading="isLoading" label="Save" />
            </div>
        </form>
    </Modal>
</template>