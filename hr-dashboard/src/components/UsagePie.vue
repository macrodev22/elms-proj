<script setup>

const { used, total, progressColor, trackColor } = defineProps({
    used: { type: Number, default: 0 },
    total: { type: Number, default: 21 },
    progressColor: { type: String, default: '#32A74E' },
    trackColor: { type: String, default: '#e5e7eb' }
})

const radius = 40
const circumfrence = 2 * Math.PI * radius
const progress = Math.min(used / total, 1) || 0.01
const offset = circumfrence * (1 - progress)

</script>
<template>
    <div class="relative rotate-[-90deg]">
        <svg class="size-full">
            <circle cx="44" cy="44" :r="radius" stroke-width="2" :stroke="trackColor" fill="none" />
            <circle cx="44" cy="44" :r="radius" stroke-width="4" :stroke="progressColor"
                :stroke-dasharray="circumfrence" :stroke-dashoffset="offset" stroke-linecap="round" fill="none" />
        </svg>
        <div class="absolute w-full flex items-center justify-center inset-0 rotate-[+90deg]">
            <p>
                <span class="text-4xl">{{ used }}</span><span class="text-gray-600">/ {{ total }}</span>
            </p>
        </div>
    </div>
</template>