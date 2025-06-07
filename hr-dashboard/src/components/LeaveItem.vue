<script setup>
import { formatDate, getDurationLabel } from '../utils';
import StatusChip from './StatusChip.vue';
import { CheckCircleIcon, EllipsisHorizontalCircleIcon, NoSymbolIcon } from '@heroicons/vue/24/outline';

const { leave } = defineProps({
    leave: Object,
})

const emit = defineEmits(['select', 'actionClick'])

</script>
<template>
    <div class="bg-gray-100 rounded-md flex gap-2 justify-between items-center text-base font-normal p-2 mb-4">
        <p class="flex-[1.5] truncate font-semibold">{{ leave.type.name }}</p>
        <p class="flex-3" v-html="`${formatDate(leave.start_time)} - ${formatDate(leave.end_time)}`"></p>
        <p class="hidden sm:block flex-1 font-semibold">{{ getDurationLabel(leave.start_time, leave.end_time) }}</p>
        <p class="flex-3 truncate"
            v-html="`<span class='text-gray-600 text-sm'>(${leave.requested_by.first_name || leave.requested_by.email})</span> ${leave.reason}`">
        </p>
        <StatusChip :status="leave.status_display" class="flex-1" />
        <div class="hidden sm:flex gap-1 flex-3 justify-center text-xs">
            <button :disabled="leave.closed" @click="emit('actionClick', { action: 'Approve', id: leave.id })"
                class="bg-green-500 hover:bg-green-600 rounded-md py-2 px-2.5 text-white cursor-pointer disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-green-500 disabled:border-1">Aprrove</button>
            <button :disabled="leave.closed" @click="emit('actionClick', { action: 'Ask Supervisor', id: leave.id })"
                class="border-1 border-amber-500 hover:bg-amber-500 hover:text-white rounded-md py-2 px-2.5 text-amber-500 cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-amber-500">Ask
                Supervisor</button>
            <button :disabled="leave.closed ? true : false"
                @click="emit('actionClick', { action: 'Decline', id: leave.id })"
                class="border-1 border-red-500 hover:bg-red-500 hover:text-white rounded-md py-2 px-2.5 text-red-500 cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-red-500">Decline
            </button>
        </div>
        <div @click="emit('select', leave)"
            class="rounded-md border-1 flex items-center justify-center p-1  cursor-pointer"
            :class="leave.closed ? 'border-gray-500 hover:bg-gray-600' : 'border-green-500 hover:bg-green-700'">
            <NoSymbolIcon v-if="leave.closed" class="stroke-gray-500 size-7" />
            <EllipsisHorizontalCircleIcon v-if="!leave.closed" class="size-7 stroke-green-500" />
        </div>
    </div>
</template>