<script setup>

const { label, type } = defineProps({
    label: String,
    type: String
})
</script>
<template>
    <button
        class="bg-green-800 text-white text-xl rounded-md font-normal px-3 py-1 flex items-center gap-1 cursor-pointer hover:bg-green-900">
        <slot />
        {{ label }}
    </button>
</template>