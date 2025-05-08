<script setup>
import { formatName, formatPhoto } from '../utils';

import UsagePie from './UsagePie.vue';


const { employee, leaveData, usedLeaveDays } = defineProps({
    employee: { type: Object, required: true },
    leaveData: { type: Array, required: true },
    usedLeaveDays: { type: Number, default: 0 },
})

const totalLeaveDays = 21
const approvedRequests = leaveData.reduce((p, c) => c.status == 'APPR' ? p + 1 : p, 0)

</script>

<template>
    <div class="flex gap-6 items-center justify-between rounded-md bg-gray-100 p-2 shadow-sm mb-4">
        <div class="flex gap-2 items-center">
            <img :src="formatPhoto(employee.profile_picture_url, employee.gender)" :alt="employee.first_name"
                class="size-22 rounded-full object-cover">
            <div class="flex-flex-col">
                <p class="font-semibold text-lg">{{ formatName(employee, true) }}</p>
                <p>{{ employee.email }}</p>
                <p v-if="employee.gender_display">{{ employee.gender_display }}</p>
            </div>
        </div>
        <div class="flex flex-col">
            <p v-if="employee.role_display">{{ employee.role_display }}</p>
            <p v-if="employee.designation">{{ employee.designation }}</p>
        </div>
        <div class="flex flex-col">
            <p><span class="font-semibold">Used leave days:</span> <span>{{ usedLeaveDays }}</span></p>
            <p><span class="font-semibold">Total leave days:</span> <span>{{ totalLeaveDays }}</span></p>
            <p><span class="font-semibold">Remaining days:</span> <span>{{ totalLeaveDays - usedLeaveDays }}
                </span></p>
        </div>
        <div class="flex flex-col">
            <p><span class="font-semibold">Pending leave:</span> <span>{{leaveData.reduce((p, c) => c.status == 'PNDG' ?
                p + 1 : p, 0)}}</span></p>
            <p><span class="font-semibold">Approved leave:</span> <span>{{ approvedRequests }} </span></p>
            <p><span class="font-semibold">Leave requests:</span> <span>{{ leaveData?.length }}</span></p>
        </div>
        <UsagePie :used="approvedRequests" :total="leaveData.length" class="size-22" track-color="#d1d5dc" />

    </div>
</template>