<script setup>
import { RouterLink } from 'vue-router';

const { href, label, active } = defineProps({
    href: String,
    label: String,
    active: { type: Boolean, default: false }
})
</script>
<template>
    <RouterLink :to="href" class="text-xl flex h-full items-center px-2 border-b-3 hover:border-b-green-600"
        :class="[active ? 'border-b-green-700' : 'border-b-transparent']">
        {{ label }}
    </RouterLink>
</template>