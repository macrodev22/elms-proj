<script setup>
import Card from './Card.vue';

const { title, buttonLabel } = defineProps({
    title: { type: String, default: 'Title' },
    buttonLabel: { type: String, default: 'View full report' },
})

const emit = defineEmits(['btn-click'])
</script>
<template>
    <Card class="md:h-[400px] flex flex-col justify-between">
        <h2 class="mb-2 pb-2 font-bold text-xl border-b-2 border-b-gray-50">{{ title }}</h2>

        <slot />

        <div class="border-t-2 border-t-gray-50 flex justify-end pt-2">
            <button @click="emit('btn-click')"
                class="bg-green-500 rounded-md py-2 px-3 text-white hover:bg-green-600 cursor-pointer">
                {{ buttonLabel }}
            </button>
        </div>
    </Card>

</template>