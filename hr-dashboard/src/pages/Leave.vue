<template>
    <div class="flex gap-8">
        <Card class="flex-[2]">
            <h2 class="font-bold text-xl mb-3">Leave requests</h2>
            <LeaveHistory v-for="leave in store.leaveHistory" :key="leave.dates + leave.reason" :dates="leave.dates"
                :duration="leave.duration" :reason="leave.reason" :status="leave.status" :type="leave.type" />
        </Card>
        <Card class="flex-[1]">
            <h2 class="font-bold text-xl ">Birthdays</h2>
        </Card>
    </div>
</template>
<script setup>
import { useStore } from '../store';
import Card from '../components/Card.vue';
import LeaveHistory from '../components/LeaveHistory.vue';

const store = useStore()

</script>