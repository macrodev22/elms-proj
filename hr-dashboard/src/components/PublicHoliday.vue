<script setup>
import { formatDate } from '../utils';
const { name, date, type } = defineProps({
    name: String,
    date: String,
    type: { type: String, default: 'Public Holiday' }
})


</script>
<template>
    <div class="rounded-md flex text-sm p-2"
        :class="type.trim().toLowerCase().startsWith('optional') ? 'bg-gray-100' : 'bg-green-100'">
        <div class="flex-1 font-bold">{{ name }}</div>
        <div class="flex-1 ">{{ type }}</div>
        <div class="flex-1 font-bold text-right" v-html="formatDate(date)"></div>
    </div>
</template>