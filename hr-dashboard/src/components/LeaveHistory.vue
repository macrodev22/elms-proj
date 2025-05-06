<script setup>
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline';
import StatusChip from './StatusChip.vue';
import { formatDate, getDurationLabel } from '../utils';

const { leave } = defineProps({
    leave: Object,
})


</script>

<template>
    <div class="bg-gray-100 flex justify-between items-center gap-2.5 mb-2 p-2 rounded-md text-xs font-bold">
        <div class="flex-2 truncate">{{ leave.type.name }}</div>
        <div class="flex-3 font-normal" v-html="`${formatDate(leave.start_time)} - ${formatDate(leave.end_time)}`">
        </div>
        <div class="flex-1">{{ getDurationLabel(leave.start_time, leave.end_time) }}</div>
        <div class="font-normal flex-2">{{ leave.reason }}</div>
        <StatusChip :status="leave.status_display" class="flex-[1]" />
        <div>
            <EllipsisVerticalIcon class="size-6" />
        </div>
    </div>
</template>