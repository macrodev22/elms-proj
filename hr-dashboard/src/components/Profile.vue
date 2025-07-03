<script setup>
import { ref } from 'vue';
import { formatName, formatPhoto } from '../utils';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/outline';
import ProfileDropDown from './ProfileDropDown.vue';
import { useOnClickOutside } from '../use';

const { user } = defineProps({
    user: Object,
})

const showDropDown = ref(false)

const profileDropDownRef = ref(null)
const dropDownBtnRef = ref(null)

// useOnClickOutside(profileDropDownRef, () => showDropDown.value = false, {
//     ignore: [dropDownBtnRef]
// })

</script>

<template>
    <div class="bg-gray-100 p-0.5 rounded-full flex gap-1.5 items-center relative">
        <ProfileDropDown :show="showDropDown" :user="user" @close-dropdown="showDropDown = false"
            ref="profileDropDownRef" />
        <div class="flex items-center gap-1">
            <div class="p-1 ml-1 cursor-pointer" @click="showDropDown = !showDropDown" ref="dropDownBtnRef">
                <ChevronDownIcon class="size-6" v-if="!showDropDown" />
                <ChevronUpIcon class="size-6" v-if="showDropDown" />
            </div>
            <div class="flex flex-col">
                <p class="font-bold text-sm">{{ formatName(user) }}</p>
                <p class="text-xs">{{ user?.email }}</p>
            </div>
        </div>
        <img class="w-12 h-12 object-cover rounded-full"
            :src="formatPhoto(user?.profile_picture || null, user?.gender || null)" alt="profile photo">
    </div>
</template>