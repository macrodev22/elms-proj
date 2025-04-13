<script setup>
const { href, label } = defineProps({
    href: String,
    label: String
})
</script>
<template>
    <a :href="href"
        class="text-xl flex h-full items-center border-b-3 border-b-transparent hover:border-b-green-700 hover:border-b-3">
        {{ label }}
    </a>
</template>