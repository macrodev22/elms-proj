<script setup>
import { ref } from 'vue';
import { getDurationLabel, formatDate, formatName } from '../utils';
import { toast } from 'vue3-toastify';
import { useStore } from '../store';
import Modal from './Modal.vue';
import StatusChip from './StatusChip.vue';
import { client } from '../services/client';

const store = useStore()

const emit = defineEmits(['close-modal'])

const showRemarkField = ref(false)
const remark = ref('')

const { show, leave } = defineProps({
    show: { type: Boolean, default: false },
    leave: Object,
})

const vFocus = {
    mounted: (el) => el.focus()
}

const vClear = {
    mounted: el => {
        el.value = ""
        el.dispatchEvent(new Event('input'))
    }
}

const action = (action) => {
    if (!showRemarkField.value) {
        showRemarkField.value = true
        return
    }

    const payload = {
        remarks: remark.value,
        action,
    }

    client.post(`/hr/leave-action/${leave.id}`, payload)
        .then(({ data }) => {
            store.setLeaveHistory()
            toast.success(data.detail, { position: toast.POSITION.TOP_CENTER, theme: toast.THEME.COLORED })
        })
        .catch(e => {
            console.error('action leave', e)
            toast.error(`${e.response?.data[0] || e.message}`)
        })
}

</script>
<template>
    <Modal :show="show" @close-modal="emit('close-modal')" title="Leave details">
        <div class="flex gap-4 mb-4">
            <span v-if="leave.closed" class="text-yellow-500">This leave request was closed
            </span>
            <StatusChip :status="leave.status_display" />
        </div>
        <div class="grid grid-cols-[1fr_3fr] gap-x-2 gap-y-2">
            <p>Type:</p>
            <p>{{ leave.type.name }}</p>
            <p>Requested by:</p>
            <p>{{ `${formatName(leave.requested_by)} - (${leave.requested_by.email})` }}</p>
            <p>Duration:</p>
            <p>{{ getDurationLabel(leave.start_time, leave.end_time) }}</p>
            <p>Dates:</p>
            <p v-html="`${formatDate(leave.start_time, true)} to ${formatDate(leave.end_time, true)}`"></p>
            <p>Reason:</p>
            <p>{{ leave.reason }}</p>
        </div>

        <div class="mt-4" v-if="leave.supervisor_remarks">
            <label for="supervisor-remarks" class="font-semibold">Supervisor remarks <span
                    class="text-gray-600 font-normal">{{ `(${formatName(leave.supervisor)}, ${leave.supervisor.email})`
                    }}</span></label>
            <ul id="supervisor-remarks"
                class="w-full mt-2 border-1 border-gray-100 rounded-md p-2 max-h-100 overflow-y-auto text-orange-500 focus:outline-none">
                <li v-for="r in leave.supervisor_remarks" class="bg-slate-50 rounded-sm p-1 my-1">{{ r.message }} <span
                        class="text-gray-400 text-sm"
                        v-html="`on (${formatDate(r.date, true, true, true)}) by ${formatName(r.user)}`">

                    </span></li>
            </ul>
        </div>

        <div v-if="showRemarkField">
            <textarea v-focus v-clear v-model="remark" name="remarks" id="remarks"
                placeholder="Enter remarks for decided action"
                class="w-full border-1 border-gray-200 rounded-md shadow-sm p-2 mt-6 focus:outline-1 focus:outline-blue-600"></textarea>
        </div>


        <div class="flex gap-4 flex-3 justify-center text-lg mt-6">
            <button :disabled="leave.closed" @click="action('Approve')"
                class="bg-green-500 hover:bg-green-600 rounded-md py-2 px-2.5 text-white cursor-pointer disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-green-500 disabled:border-1">Aprrove</button>
            <button :disabled="leave.closed" @click="action('Ask Supervisor')"
                class="border-1 border-amber-500 hover:bg-amber-500 hover:text-white rounded-md py-2 px-2.5 text-amber-500 cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-amber-500">Ask
                Supervisor</button>
            <button :disabled="leave.closed ? true : false" @click="action('Decline')"
                class="border-1 border-red-500 hover:bg-red-500 hover:text-white rounded-md py-2 px-2.5 text-red-500 cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-red-500">Decline
            </button>
        </div>
    </Modal>
</template>