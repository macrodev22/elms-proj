<template>

    <Card>
        <h2 class="font-bold text-xl mb-3">Leave requests</h2>
        <LeaveItem v-for="leave in store.leaveHistory" :key="leave.dates + leave.reason" :dates="leave.dates"
            :duration="leave.duration" :reason="leave.reason" :status="leave.status" :type="leave.type" />
    </Card>

</template>
<script setup>
import { useStore } from '../store';
import Card from '../components/Card.vue';
import LeaveItem from '../components/LeaveItem.vue';

const store = useStore()

</script>