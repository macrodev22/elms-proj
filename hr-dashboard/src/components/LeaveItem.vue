<script setup>
import StatusChip from './StatusChip.vue';
</script>
<template>
    <div class="bg-gray-100 rounded-md flex justify-between text-lg font-light p-2 mb-4">
        <p>Annual leave</p>
        <p>18th May 2025 - 20th May 2025</p>
        <p>3 Days</p>
        <p>Going for vacation</p>
        <StatusChip status="Pending" />
    </div>
</template>