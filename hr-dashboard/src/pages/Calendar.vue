<template>
    <Card>
        <h2 class="font-bold text-xl border-b-2 border-b-gray-50 mb-2">Calendar</h2>
        <div>
            <ScheduleXCalendar :calendar-app="calendarApp" />
        </div>
    </Card>
</template>
<script setup>
import { ScheduleXCalendar } from '@schedule-x/vue';
import Card from '../components/Card.vue';
import { createCalendar, createViewMonthGrid, createViewMonthAgenda, createViewWeek, createViewDay } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';

const viewMonth = createViewMonthGrid()

const calendarApp = createCalendar({
    selectedDate: '2025-05-19',
    views: [
        viewMonth,
        createViewMonthAgenda(),
        createViewWeek(),
        createViewDay(),
    ],
    defaultView: viewMonth.name,
    events: [
        { id: 1, title: 'John Wayne', start: '2025-05-19 05:00', end: '2025-05-20 18:00' },
        { id: 1, title: 'Tamara Joan K.', start: '2025-05-22 00:00', end: '2025-05-27 23:59' },
        { id: 1, title: 'Stephan Gunn', start: '2025-05-09 05:00', end: '2025-05-13 18:00' },
    ]
})
</script>