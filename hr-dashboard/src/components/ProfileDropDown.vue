<script setup>
import { ref } from 'vue';
import { client } from '../services/client';
import { toast } from 'vue3-toastify';
import UpdateUserProfileModal from './UpdateUserProfileModal.vue';

const { show, user } = defineProps({
    show: { type: Boolean, default: false },
    user: Object
})

const emit = defineEmits(['close-dropdown'])

const showProfileUpdateModal = ref(false)

const logout = () => {
    emit('close-dropdown')

    client.post('/auth/logout')
        .then(res => {
            client.defaults.headers.common['Authorization'] = `Bearer null`
            toast.info('Logged out successfully 😁', {
                position: toast.POSITION.TOP_CENTER
            })

            window.location.href = '/'
        })
}
</script>

<template>
    <div class="absolute z-50 right-0 top-[100%] min-w-[100%] w-2xs p-4 rounded-md bg-gray-50 shadow-xl" v-show="show">
        <p class="font-semibold text-center mb-4 text-xl">Profile</p>
        <div class="grid grid-cols-[1fr_2fr] mb-3 gap-x-2.5">
            <p class="font-semibold">Company:</p>
            <p></p>
            <p class="font-semibold">Role:</p>
            <p>{{ user?.role_display }}</p>
            <p class="font-semibold">Contact:</p>
            <div>
                <p>Mob: {{ user?.contact.mobile }}</p>
                <p>Work: {{ user?.contact.work }}</p>
            </div>
            <p class="font-semibold">Gender:</p>
            <p>{{ user?.gender_display }}</p>
            <p class="font-semibold">Designation:</p>
            <p>{{ user?.designation }}</p>
        </div>
        <div class="flex justify-between">
            <button @click="logout"
                class="bg-red-400 hover:bg-red-500 px-4 py-1.5 text-white text-xl rounded-md cursor-pointer">
                Logout</button>
            <button @click=" emit('close-dropdown'); showProfileUpdateModal = true"
                class="bg-blue-400 hover:bg-blue-500 px-4 py-1.5 rounded-md text-white text-xl cursor-pointer">Edit</button>
        </div>
        <UpdateUserProfileModal :show="showProfileUpdateModal" :user="user"
            @close-modal="showProfileUpdateModal = false" />
    </div>
</template>