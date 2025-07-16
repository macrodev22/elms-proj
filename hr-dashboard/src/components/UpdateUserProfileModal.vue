<script setup>
import { ref, reactive, watch, toRaw } from 'vue';
import { useStore } from '../store';
import { client, getCompanyDepartments } from '../services/client';
import { toast } from 'vue3-toastify';
import { vScrollIntoView, vClear } from '../directives';
import profilePhotoGeneric from '../assets/generic_profile_photo.jpg'
import Modal from './Modal.vue';
import FormField from './FormField.vue';
import DropDownField from './DropDownField.vue';
import SpinnerButton from './SpinnerButton.vue';
import Button from './Button.vue';
import { ArrowPathIcon } from '@heroicons/vue/24/outline';

const store = useStore()

const { show, user } = defineProps({
    show: { type: Boolean, defaul: false },
    user: Object
})

const emit = defineEmits(['close-modal'])

const formFields = reactive({
    profile_picture_url: null,
    first_name: "",
    middle_name: "",
    last_name: "",
    role: "",
    profile_picture: null,
    date_of_birth: null,
    contact: {
        mobile: "",
        work: ""
    },
    gender: "",
    designation: null,
    department: { id: null },
    password: 'defaultpassword'
})

const showChangePassword = ref(false)
const newPassword = reactive({
    oldPassword: "",
    oldPasswordErrors: [],
    newPassword: "",
    newPasswordErrors: [],
    newPasswordConfirmation: "",
    newPasswordConfirmationErrors: [],
})

watch(() => show, (val) => {
    if (val && user) {
        formFields.first_name = user.first_name
        formFields.middle_name = user.middle_name
        formFields.last_name = user.last_name
        formFields.role = user.role
        formFields.department = user.department
        formFields.gender = user.gender
        formFields.designation = user.designation
        formFields.date_of_birth = user.date_of_birth
        formFields.contact = user.contact

        getCompanyDepartments().then(res => {
            departments.value = res.data
        })
    }


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

const form = ref(null)
const profileImg = ref(null)
const photoInput = ref(null)

const isLoading = ref(false)
const passwordIsLoading = ref(false)

const initialDisplayedProfileImage = ref('')

    ; (() => {
        let userPic = user.profile_picture_url
        if (!userPic) {
            initialDisplayedProfileImage.value = profilePhotoGeneric
            return;
        }
        fetch(userPic)
            .then(res => res.blob())
            .then(blob => {
                const fr = new FileReader()
                fr.addEventListener('load', () => {
                    initialDisplayedProfileImage.value = fr.result
                })
                fr.readAsDataURL(blob)
            }).catch(e => {
                initialDisplayedProfileImage.value = profilePhotoGeneric
            })
    })()

const onPhotoChange = () => {
    const file = photoInput.value.files[0]
    const fr = new FileReader()
    fr.addEventListener('load', () => {
        initialDisplayedProfileImage.value = fr.result
    })
    fr.readAsDataURL(file)
}

const resetPhotoInput = () => {
    photoInput.value.value = ''
    initialDisplayedProfileImage.value = profilePhotoGeneric
}

const updateUser = () => {
    isLoading.value = true

    const formData = new FormData(form.value)

    formData.append('contact', JSON.stringify(toRaw(formFields.contact)))

    // Remove profile picture if not updated
    if (!photoInput.value.files || photoInput.value.files.length == 0) {
        formData.delete('profile_picture')
    }

    client.patchForm('/auth/profile', formData)
        .then(({ data }) => {
            store.auth.user = data
            toast.success('User updated successfully', {
                position: toast.POSITION.TOP_CENTER
            })
        })
        .catch(e => {
            toast.error(`Error updating user \n${e.response?.data.detail || e.message}`)
        })
        .finally(() => {
            isLoading.value = false
        })
}

const updatePassword = () => {
    passwordIsLoading.value = true
    newPassword.oldPasswordErrors = []
    newPassword.newPasswordErrors = []
    newPassword.newPasswordConfirmationErrors = []

    client.post('/auth/change-password', {
        "old_password": newPassword.oldPassword,
        "new_password": newPassword.newPassword,
        "new_password_confirm": newPassword.newPasswordConfirmation,
    })
        .then(({ data }) => {
            toast.success(data?.detail, { position: toast.POSITION.TOP_CENTER })
        })
        .catch(e => {
            // console.error('password update', e)
            newPassword.oldPasswordErrors = []
            newPassword.newPasswordErrors = []
            newPassword.newPasswordConfirmationErrors = []

            toast.error(`Error changing password: ${e.status}`)
            const { data } = e.response
            if (data?.old_password) newPassword.oldPasswordErrors = data.old_password
            if (data?.new_password) newPassword.newPasswordErrors = data.new_password
            if (data?.new_password_confirm) newPassword.newPasswordConfirmationErrors = data.new_password_confirm
        })
        .finally(() => {
            passwordIsLoading.value = false
        })
}
</script>
<template>
    <Modal title="Update profile" :show="show" @close-modal="emit('close-modal')">
        <form method="post" ref="form" @submit.prevent="updateUser" enctype="multipart/form-data">
            <FormField name="first_name" label="First name" v-model="formFields.first_name" />
            <FormField name="middle_name" label="Middle name" :required="false" v-model="formFields.middle_name" />
            <FormField name="last_name" label="Last name" v-model="formFields.last_name" />
            <FormField name="designation" label="Designation" v-model="formFields.designation" :required="false" />
            <div class="flex flex-col sm:flex-row gap-2">
                <FormField name="work-contact" label="Work Contact" :required="false"
                    v-model="formFields.contact.work" />
                <FormField name="mobile-contact" label="Mobile Contact" :required="false"
                    v-model="formFields.contact.mobile" />
            </div>
            <div class="flex flex-col sm:flex-row gap-8 items-start sm:items-center mb-4">
                <div class="flex flex-col">
                    <label for="date_of_birth" class="mb-1.5">Date of Birth</label>
                    <input v-model="formFields.date_of_birth" type="date" placeholder="Date of Birth"
                        name="date_of_birth" id="date_of_birth" class="border-2 border-gray-100 rounded-sm px-4 py-1.5">
                </div>
                <div class="flex gap-4">
                    <div class="rounded-full w-26 h-26 overflow-hidden border-gray-200 border-1">
                        <img :src="initialDisplayedProfileImage" ref="profileImg" alt="profile photo"
                            class="w-full h-full object-cover">
                    </div>
                    <label for="profile_picture" class="mb-1.5 grid place-items-center">
                        <span
                            class="rounded-lg cursor-pointer border-1 border-green-500 py-2 px-5 hover:bg-green-500 hover:text-white">
                            Choose Profile Photo
                        </span>
                    </label>
                    <input type="file" ref="photoInput" @change="onPhotoChange" accept="image/*" id="profile_picture"
                        name="profile_picture" class="hidden">
                    <button>
                        <ArrowPathIcon
                            class="size-12 cursor-pointer hover:bg-green-500 hover:stroke-white rounded-full p-2"
                            @click.prevent="resetPhotoInput" />
                    </button>

                </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
                <DropDownField name="department" label="Department" v-model="formFields.department.id"
                    :options="departments.map(d => ({ value: d.id, label: d.name }))" />
                <DropDownField label="Role" name="role" :options="roles" v-model="formFields.role" />
                <DropDownField label="Gender" name="gender" :disabled="true" :options="genders"
                    v-model="formFields.gender" />
            </div>
            <div class="flex mb-6 mt-2">
                <SpinnerButton label="Update" :isLoading="isLoading" />
            </div>
        </form>
        <!-- Update password  -->
        <Button label="Change password" @click="showChangePassword = !showChangePassword" />
        <form v-if="showChangePassword" @submit.prevent="updatePassword" v-scroll-into-view v-clear>
            <FormField name="old_password" type="password" label="Old password" v-model="newPassword.oldPassword" />
            <ul v-if="newPassword.oldPasswordErrors" class="text-sm text-red-500 mb-4 mt-[-1rem]">
                <li v-for="e of newPassword.oldPasswordErrors">{{ e }}</li>
            </ul>
            <FormField name="new_password" type="password" label="New password" v-model="newPassword.newPassword" />
            <ul v-if="newPassword.newPasswordErrors" class="text-sm text-red-500 mb-4 mt-[-1rem]">
                <li v-for="e of newPassword.newPasswordErrors">{{ e }}</li>
            </ul>
            <FormField name="new_password_confirm" type="password" label="New password confirmation"
                v-model="newPassword.newPasswordConfirmation" />
            <ul v-if="newPassword.newPasswordConfirmationErrors" class="text-sm text-red-500 mb-4 mt-[-1rem]">
                <li v-for="e of newPassword.newPasswordConfirmationErrors">{{ e }}</li>
            </ul>
            <div class="flex mb-6 mt-2">
                <SpinnerButton label="Set new password" :isLoading="passwordIsLoading" />
            </div>
        </form>
    </Modal>
</template>