<template>

    <Card>
        <h2 class="font-bold text-xl mb-3 border-b-gray-50 border-b-2">Leave requests</h2>
        <LeaveItem v-for="leave in store.leaveHistory" :key="leave.id" :leave="leave" />
    </Card>

</template>
<script setup>
import { useStore } from '../store';
import Card from '../components/Card.vue';
import LeaveItem from '../components/LeaveItem.vue';

const store = useStore()

</script>