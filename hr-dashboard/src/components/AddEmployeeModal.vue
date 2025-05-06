<script setup>
import { reactive, ref } from 'vue';
import { client } from '../services/client'
import Modal from './Modal.vue';
import FormField from './FormField.vue';
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
    profile_picture: null,
    date_of_birth: null,
    company: 2,
    department: 3,
    password: "defaultpassword"
})

const profileImg = ref(null)
const photoInput = ref(null)

const onPhotoChange = () => {
    const file = photoInput.value.files[0]
    const fr = new FileReader()

    fr.addEventListener('load', () => {
        profileImg.value.src = fr.result
    })

    fr.readAsDataURL(file)
}

const saveEmployee = () => {
    client.post('/hr/create-employee')
        .then(res => console.log(res))
        .catch(e => console.error(e))
}

</script>

<template>
    <Modal title="Add an Employee" :show="show" @close-modal="emit('close-modal')">
        <form method="post" @submit.prevent="saveEmployee">
            <FormField name="first_name" label="First name" v-model:model-value="formFields.first_name" />
            <FormField name="middle_name" label="Middle name" v-model:model-value="formFields.middle_name" />
            <FormField name="last_name" label="Last name" v-model:model-value="formFields.last_name" />
            <FormField name="email" label="Email" type="email" v-bind:model-value="formFields.email" />
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
                    <input type="file" ref="photoInput" @change="onPhotoChange" id="profile_picture"
                        name="profile_picture" class="hidden">

                </div>
            </div>

            <FormField name="department" label="Department" />
            <FormField name="password" label="password" v-model:model-value="formFields.password" />
            <div class="flex mb-6 mt-2">
                <button
                    class="rounded-md bg-green-500 px-12 py-2 text-white cursor-pointer hover:bg-green-600">Save</button>
            </div>
        </form>
    </Modal>
</template>