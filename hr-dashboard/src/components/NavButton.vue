<script setup>
import { RouterLink } from 'vue-router';

const { href, label, active } = defineProps({
    href: String | Object,
    label: String,
    active: { type: Boolean, default: false },
    badge: null
})
</script>
<template>
    <RouterLink :to="href" class="text-xl flex h-full items-center px-2 border-b-3 hover:border-b-green-600 relative"
        :class="[active ? 'border-b-green-700' : 'border-b-transparent']">
        <span v-if="badge" class="absolute bg-red-400 rounded-full py-0.5 px-2  top-[0.5rem] right-[-1rem] text-white text-sm">{{ badge }}</span>
        {{ label }}
    </RouterLink>
</template>