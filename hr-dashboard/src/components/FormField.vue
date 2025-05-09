<template>
    <div class="flex flex-col mb-4">
        <label :for="name" class="mb-1.5 flex gap-4">
            <p>
                <span v-if="required" class="text-red-500">*</span>
                {{ label }}
            </p>
            <span v-if="!required" class="text-gray-500 italic">(Optional)</span>
        </label>
        <input :value="modelValue" @change="emit('update:modelValue', $event.target.value)" :type="type"
            :placeholder="label" :name="name" :id="name" :disabled="disabled"
            class="border-2 border-gray-100 rounded-sm px-4 py-1.5">
    </div>
</template>
<script setup>

const emit = defineEmits(['update:modelValue'])

const { label, name, type, required, modelValue, disabled } = defineProps({
    modelValue: [String , Number],
    name: { type: String, required: true },
    label: { type: String, default: 'Label' },
    type: { type: String, default: 'text' },
    required: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
})


</script>