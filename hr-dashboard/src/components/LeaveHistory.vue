<script setup>
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline';
import StatusChip from './StatusChip.vue';

const { type, dates, duration, status, reason } = defineProps({
    type: String,
    dates: String,
    duration: String,
    reason: String,
    status: String
})
</script>

<template>
    <div class="bg-gray-100 flex justify-between items-center gap-2.5 mb-2 p-2 rounded-md text-sm font-bold">
        <div>{{ type }}</div>
        <div>{{ dates }}</div>
        <div>{{ duration }}</div>
        <div class="font-normal">{{ reason }}</div>
        <StatusChip :status="status" />
        <div>
            <EllipsisVerticalIcon class="size-6" />
        </div>
    </div>
</template>