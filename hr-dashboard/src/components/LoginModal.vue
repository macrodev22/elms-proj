<script setup>
import { ref } from 'vue';
import { client } from '../services/client';
import { toast } from 'vue3-toastify';
import { useStore } from '../store';
import Modal from './Modal.vue';
import FormField from './FormField.vue';

const store = useStore()

const emit = defineEmits(['close-modal'])
const { show } = defineProps({
    show: Boolean
})

const email = ref('')
const password = ref('')

const login = () => {
    client.post('/auth/login', {
        email: email.value,
        password: password.value
    })
        .then(res => {
            const user = res.data.user
            const token = res.data.token
            store.auth.user = user
            store.auth.token = token
            client.defaults.headers.common['Authorization'] = `Bearer ${token}`
            // console.log(res)

            //Other resources
            store.setResources()

            // toast.success(`User logged in`)
            emit('close-modal')
        })
        .catch(e => {
            console.error(e)
            toast.error(`Error logging in! \n${e.response.data.detail}`, {
                position: toast.POSITION.TOP_CENTER,
                theme: toast.THEME.COLORED,
                transition: toast.TRANSITIONS.FLIP
            })
        })
}

</script>
<template>
    <Modal title="HR Login" @close-modal="emit('close-modal')" :show="show" :darkBackdrop="true" :closable="false">
        <form method="post" @submit.prevent="login">
            <div class="flex flex-col mt-8">
                <FormField name="email" label="Email" v-model="email" />
                <FormField name="password" label="Password" type="password" v-model="password" />
                <div class="flex mb-6">
                    <button
                        class="cursor-pointer bg-green-500 hover:bg-green-600 text-white rounded-md px-14 py-2 text-xl">Login</button>
                </div>
            </div>
        </form>
    </Modal>
</template>