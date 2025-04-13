<script setup>
const capitalize = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase()

const colors = {
    "annual": "#AD7EE9",
    "special": "#6497E3",
    "personal": "#E76CC1",
    "sick": "#EAA750",
    "short": "#E76CC1",
    "study": "#6497E3"
}

const { type, subtitle, count, total } = defineProps({
    type: String,
    subtitle: { type: String, default: "Requests" },
    count: Number,
    total: Number,
})

const progress = Math.min(count / total, 1)
const progressColor = colors[type.toLowerCase()] || "#AD7EE9"

const radius = 58
const circumfrence = 2 * Math.PI * radius
const offset = circumfrence * (1 - progress)
</script>
<template>
    <div class="flex flex-col justify-between gap-2.5 items-center">
        <div class="relative w-34 h-34 text-gray-400">
            <svg class="w-full h-full rotate-[-90deg]">
                <!-- Track -->
                <circle cx="68" cy="68" :r="radius" stroke="#F1F1F3" stroke-width="2" fill="none" />
                <!-- Progress -->
                <circle cx="68" cy="68" :r="radius" :stroke="progressColor" stroke-width="4" fill="none"
                    :stroke-dasharray="circumfrence" :stroke-dashoffset="offset" stroke-linecap="round"
                    style="filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.1));" />
            </svg>

            <div class="absolute inset-0 gap-3.5 flex flex-col items-center justify-center text-center">
                <p class="text-sm">{{ subtitle }}</p>
                <p><span class="text-3xl text-black">{{ count }}</span> /{{ total }}</p>
            </div>
        </div>
        <p class="text-sm">{{ capitalize(type) }} leave</p>
    </div>
</template>

<style></style>