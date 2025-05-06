<script setup>
const { count, item } = defineProps({
    count: { type: Number, default: 0 },
    item: { type: String, default: 'Item' }
})
</script>
<template>
    <div class="flex p-4 items-center justify-between rounded-md border-2 border-gray-300">
        <p>{{ item }}</p>
        <div class="rounded-full bg-green-500 text-white font-bold text-xl py-1 px-3">
            {{ count }}
        </div>
    </div>
</template>