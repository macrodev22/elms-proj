<script setup>
import Card from './Card.vue';
import { Teleport } from 'vue';
import { XCircleIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits(['close-modal'])

const { show, title, darkBackdrop, closable } = defineProps({
    show: { type: Boolean, default: false },
    title: { type: String, default: 'Title' },
    darkBackdrop: { type: Boolean, default: false },
    closable: { type: Boolean, default: true }
})

const onCloseModal = () => {
    if (closable)
        emit('close-modal')
}
</script>

<template>
    <Teleport to=".modal-container">
        <div v-if="show" @click.self="onCloseModal"
            :class="darkBackdrop ? 'bg-[rgba(5,5,5,0.9)] backdrop-blur-md' : 'bg-[rgba(55,55,55,0.1)]'"
            class="fixed z-40 w-[100vw] h-[100vh] transform-[translate(-50%, -50%)]">
            <Card
                class="w-[95%] md:w-[75%] min-h-45 max-h-[95vh] px-4 py-2 md:px-12 md:py-4 overflow-y-scroll absolute top-4 left-1/2 transform-[translateX(-50%)]">
                <h2 class="flex justify-between mb-2 text-xl font-bold">
                    <span>{{ title }}</span>
                    <button class="cursor-pointer" @click="onCloseModal" v-if="closable">
                        <XCircleIcon class="size-12 stroke-red-400" />
                    </button>
                </h2>
                <slot />
            </Card>
        </div>
    </Teleport>
</template>