<script setup>
import { ref } from 'vue';

const emit = defineEmits(['update:modelValue'])

const { options, name, label, modelValue, disabled } = defineProps({
    options: { type: Array, default: [{ value: 'val1', label: 'Label 1' }] },
    name: String,
    label: { type: String, default: 'Label' },
    required: { type: Boolean, default: true },
    modelValue: [String, Number],
    disabled: { type: Boolean, default: false }
})


</script>
<template>
    <div class="flex flex-col mb-4">
        <label :for="name" class="mb-1.5"><span class="text-red-500">* </span>{{ label }}</label>
        <select :name="name" :id="name" :value="modelValue" @change="emit('update:modelValue', $event.target.value)"
            :disabled="disabled" class="border-2 rounded-md border-gray-100 px-4 py-1.5">
            <option value="" selected disabled>-- Select</option>
            <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
    </div>
</template>