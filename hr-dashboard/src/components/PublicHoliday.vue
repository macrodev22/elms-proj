<script setup>
const { name, date, type } = defineProps({
    name: String,
    date: String,
    type: { type: String, default: 'Public Holiday' }
})

const formatDate = (dateStr) => {
    const dateParts = dateStr.split('/')
    const dateObj = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])

    const day = dateObj.getDay()
    const date = dateObj.getDate()
    const month = dateObj.toLocaleString('default', { month: 'short' })
    const year = dateObj.getFullYear()

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    let suffix
    if ([1, 21, 31].includes(date)) suffix = 'st'
    else if ([2, 22].includes(date)) suffix = 'nd'
    else if ([3, 23].includes(date)) suffix = 'rd'
    else suffix = 'th'

    return `${days[day]} ${date}<sup>${suffix}</sup> ${month} ${year}`
}
</script>
<template>
    <div class="bg-green-100 rounded-md flex text-sm p-2">
        <div class="flex-1 font-bold">{{ name }}</div>
        <div class="flex-1 ">{{ type }}</div>
        <div class="flex-1 font-bold text-right" v-html="formatDate(date)"></div>
    </div>
</template>