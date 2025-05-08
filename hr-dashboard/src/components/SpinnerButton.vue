<script setup>
import { ref } from 'vue';
import ButtonLoadingSpinner from './ButtonLoadingSpinner.vue';

const { isLoading, label } = defineProps({
    isLoading: { type: Boolean, default: false },
    label: { type: String, default: 'Label' }
})
</script>

<template>
    <button :disabled="isLoading"
        class="rounded-md bg-green-500 px-12 py-2 text-white text-lg cursor-pointer hover:bg-green-600">
        <ButtonLoadingSpinner v-if="isLoading" />
        {{ label }}
    </button>
</template>