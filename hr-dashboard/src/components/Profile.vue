<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/outline';

const { user } = defineProps({
    user: Object,
})

const formatName = (user) => {
    const names = [user.first_name, user.middle_name, user.last_name]
    if (names.every(n => !n)) {
        return 'Hello'
    }
    if (names.every(n => n)) {
        return `${names[0]} ${names[1].slice(0, 1)}. ${names[2]}`
    }
    if (names.some(n => !n)) {
        return names.reduce((p, c) => c ? `${p} ${c}` : p, '').slice(1).trim()
    }
}

const formatPhoto = (p) => p ? p : "https://wallpapers.com/images/hd/generic-male-avatar-icon-piiktqtfffyzulft.jpg"
</script>

<template>
    <div class="bg-gray-100 p-0.5 rounded-full flex gap-1.5 items-center">
        <div class="flex items-center gap-1">
            <div class="p-1 ml-1 cursor-pointer">
                <ChevronDownIcon class="size-6" />
            </div>
            <div class="flex flex-col">
                <p class="font-bold text-sm">{{ formatName(user) }}</p>
                <p class="text-xs">{{ user.email }}</p>
            </div>
        </div>
        <img class="w-12 h-12 object-cover rounded-full" :src="formatPhoto(user.profile_picture)" alt="profile photo">
    </div>
</template>