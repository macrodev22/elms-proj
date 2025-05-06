<template>
    <div class="flex flex-col mb-4">
        <label :for="name" class="mb-1.5">{{ label }}</label>
        <input v-model="value" @change="emit('update:modelValue', $event.target.value)" :type="type"
            :placeholder="label" :name="name" :id="name" class="border-2 border-gray-100 rounded-sm px-4 py-1.5">
    </div>
</template>
<script setup>
import { ref } from 'vue';

const emit = defineEmits(['update:modelValue'])

const { label, name, type, modelValue } = defineProps({
    modelValue: { type: String, default: '' },
    name: { type: String, required: true },
    label: { type: String, default: 'Label' },
    type: { type: String, default: 'text' }
})

const value = ref(modelValue)

</script>