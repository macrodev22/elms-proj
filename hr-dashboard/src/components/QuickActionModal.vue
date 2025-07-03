<script setup>
import { ref } from 'vue';
import { client } from '../services/client';
import { useStore } from '../store';
import { toast } from 'vue3-toastify';
import Modal from './Modal.vue';

const store = useStore()
const remark = ref('')
const isLoading = ref(false)

const emit = defineEmits(['close-modal'])

const { show, action } = defineProps({
    show: Boolean,
    action: { type: Object, required: true },
})

const vFocus = {
    mounted: el => el.focus()
}

const vClear = {
    mounted: el => {
        el.value = ''
        el.dispatchEvent(new Event('input'))
    }
}

const takeAction = (leaveAction) => {
    if (!leaveAction) {
        console.error('null action aborting...')
        toast.error('No action specified')
        return
    }
    const payload = {
        remarks: remark.value,
        action: leaveAction
    }
    isLoading.value = true
    const actionToast = toast.loading('Actioning leave requesting', { position: toast.POSITION.TOP_CENTER, theme: toast.THEME.COLORED })
    client.post(`/hr/leave-action/${action.id}`, payload)
        .then(({ data }) => {
            store.setLeaveHistory()
            remark.value = ''
            toast.update(actionToast, { type: 'success', render: data.detail, isLoading: false, autoClose: 2000 })
        })
        .catch(e => {
            console.error('action leave', e)
            toast.update(actionToast, { type: 'error', render: `${e.response?.data[0] || e.message}`, isLoading: false, autoClose: 2000 })
        })
        .finally(() => {
            isLoading.value = false
        })
}

</script>
<template>
    <Modal :show="show" title="Reason for action" @close-modal="emit('close-modal')">
        <div class="w-full">
            <textarea v-focus v-clear v-model="remark"
                class="w-full min-h-30 border-1 border-gray-200 rounded-md shadow-sm p-2 mt-6 focus:outline-1 focus:outline-blue-600"
                placeholder="Why choose this action?..."></textarea>
        </div>
        <div class="flex gap-4 flex-3 justify-center text-lg mt-6">
            <button @click="takeAction('Approve')" v-if="action.action == 'Approve'" :disabled="isLoading"
                class="bg-green-500 hover:bg-green-600 rounded-md py-2 px-2.5 text-white cursor-pointer disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-green-500 disabled:border-1">Aprrove</button>
            <button @click="takeAction('Ask Supervisor')" v-if="action.action == 'Ask Supervisor'" :disabled="isLoading"
                class="border-1 border-amber-500 hover:bg-amber-500 hover:text-white rounded-md py-2 px-2.5 text-amber-500 cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-amber-500">Ask
                Supervisor</button>
            <button @click="takeAction('Decline')" v-if="action.action == 'Decline'" :disabled="isLoading"
                class="border-1 border-red-500 hover:bg-red-500 hover:text-white rounded-md py-2 px-2.5 text-red-500 cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-red-500">Decline
            </button>
        </div>
    </Modal>
</template>