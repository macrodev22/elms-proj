<script setup>
import PublicHoliday from './PublicHoliday.vue';
const { holidays } = defineProps({
    holidays: Array,
})
</script>
<template>
    <div class="flex flex-col gap-1 overflow-y-scroll h-full">
        <PublicHoliday v-for="holiday in holidays" :key="holiday.name" :name="holiday.name" :date="holiday.date"
            :type="holiday.type" />
    </div>
</template>