<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/outline';

const { email, name, photo } = defineProps({
    email: String,
    photo: String,
    name: String,
})
</script>

<template>
    <div class="bg-gray-100 p-0.5 rounded-full flex gap-1.5 items-center">
        <div class="flex items-center gap-1">
            <div class="p-1 ml-1 cursor-pointer">
                <ChevronDownIcon class="size-6" />
            </div>
            <div class="flex flex-col">
                <p class="font-bold text-sm">{{ name }}</p>
                <p class="text-xs">{{ email }}</p>
            </div>
        </div>
        <img class="w-12 h-12 object-cover rounded-full" :src="photo" alt="profile photo">
    </div>
</template>