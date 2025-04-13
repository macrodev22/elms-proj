<script setup>
const { status, name, photo } = defineProps({
    status: { type: String, default: 'available' },
    name: String,
    photo: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCw6RV343VjEiadcJNk0mbq_2dzMeizoL96g&s" }
})

const capitalize = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase()

const colors = {
    "annual": "#AD7EE9",
    "special": "#6497E3",
    "personal": "#E76CC1",
    "sick": "#EAA750",
    "short": "#E76CC1",
    "study": "#6497E3",
    "available": "#32A74E",
}

const borderColor = colors[status.toLowerCase()] || colors['available']
</script>
<template>
    <div class="flex gap-2.5 w-[190px]" style="flex: 0 0 auto">
        <div class="rounded-full border-2 p-0.5 relative w-[70px] h-[70px]" :style="{ borderColor }">
            <div class="absolute rounded-full w-4 h-4 right-0" :style="{ backgroundColor: borderColor, }">
            </div>
            <div class="rounded-full w-full h-full overflow-hidden">
                <img :src="photo" alt="employee" class="object-cover rounded-full w-full h-full">
            </div>
        </div>
        <div class="flex-1 flex flex-col justify-center gap-1.5">
            <p class="text-sm font-bold">{{ name }}</p>
            <p class="text-sm text-gray-400">{{ capitalize(status) }}</p>
        </div>
    </div>
</template>