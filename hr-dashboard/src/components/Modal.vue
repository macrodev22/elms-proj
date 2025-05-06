<script setup>
import Card from './Card.vue';
import { Teleport } from 'vue';
import { XCircleIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits(['close-modal'])

const { show, title } = defineProps({
    show: { type: Boolean, default: false },
    title: { type: String, default: 'Title' }
})
</script>

<template>
    <Teleport to=".modal-container">
        <div v-show="show" @click.self="emit('close-modal')"
            class="bg-[rgba(55,55,55,0.1)] fixed z-40 w-[100vw] h-[100vh] transform-[translate(-50%, -50%)]">
            <Card
                class="w-[75%] min-h-45 max-h-[100vh] overflow-y-scroll absolute top-4 left-1/2 transform-[translateX(-50%)]">
                <h2 class="flex justify-between mb-2 text-xl font-bold">
                    <span>{{ title }}</span>
                    <button class="cursor-pointer" @click="emit('close-modal')">
                        <XCircleIcon class="size-12 stroke-red-400" />
                    </button>
                </h2>
                <slot />
            </Card>
        </div>
    </Teleport>
</template>