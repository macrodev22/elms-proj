<script setup>
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline';
import StatusChip from './StatusChip.vue';
import { formatDate, getDurationLabel } from '../utils';

const { leave } = defineProps({
    leave: Object,
})


</script>

<template>
    <div class="bg-gray-100 flex justify-between items-center gap-2.5 mb-2 p-2 rounded-md text-sm font-bold">
        <div>{{ leave.type.name }}</div>
        <div>{{ `${formatDate(leave.start_time)} - ${formatDate(leave.end_time)}` }}</div>
        <div>{{ getDurationLabel(leave.start_time, leave.end_time) }}</div>
        <div class="font-normal">{{ leave.reason }}</div>
        <StatusChip :status="leave.status_display" />
        <div>
            <EllipsisVerticalIcon class="size-6" />
        </div>
    </div>
</template>