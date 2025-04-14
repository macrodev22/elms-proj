<script setup>
const { status } = defineProps({
    status: String,
})

const colors = {
    'approved': '#D5F4DC',
    'pending': '#E3E3E3',
    'rejected': '#F3E6D6',
    'cancelled': '#F4D5D5'
}
</script>
<template>
    <div class="rounded-sm w-24 text-center px-2 py-1"
        :style="{ backgroundColor: colors[status.toLowerCase()] || '#E3E3E3' }">
        {{ status }}
    </div>
</template>