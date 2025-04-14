<script setup>
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
const { to, label } = defineProps({
    to: String,
    label: String,
})
</script>
<template>
    <a :href="to" class="bg-gray-100 rounded-md mb-2 flex items-center justify-between text-sm font-bold px-4 py-2">
        <span>
            {{ label }}
        </span>
        <ChevronRightIcon class="size-8" />
    </a>
</template>