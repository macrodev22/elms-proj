<script setup>
import { getDurationLabel, formatDate, formatName } from '../utils';
import Modal from './Modal.vue';
import StatusChip from './StatusChip.vue';

const emit = defineEmits(['close-modal'])

const { show, leave } = defineProps({
    show: { type: Boolean, default: false },
    leave: Object,
})


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


        <div class="flex gap-4 flex-3 justify-center text-lg mt-6">
            <button :disabled="leave.closed"
                class="bg-green-500 hover:bg-green-600 rounded-md py-2 px-2.5 text-white cursor-pointer disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-green-500 disabled:border-1">Aprrove</button>
            <button :disabled="leave.closed"
                class="border-1 border-amber-500 hover:bg-amber-500 hover:text-white rounded-md py-2 px-2.5 text-amber-500 cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-amber-500">Ask
                Supervisor</button>
            <button :disabled="leave.closed ? true : false"
                class="border-1 border-red-500 hover:bg-red-500 hover:text-white rounded-md py-2 px-2.5 text-red-500 cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-red-500">Decline
            </button>
        </div>
    </Modal>
</template>