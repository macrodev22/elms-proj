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
import { useStore } from '../store';
import { dateToCalendarFormat, formatName } from '../utils';
import Card from '../components/Card.vue';
import { createCalendar, createViewMonthGrid, createViewMonthAgenda, createViewWeek, createViewDay } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';

const store = useStore()
const viewMonth = createViewMonthGrid()

const getCalendarId = (leaveStatus) => {
    switch (leaveStatus) {
        case 'Approved': return 'approved';
        case 'Declined': return 'declined';
        default: return 'pending'
    }
}

const events = store.leaveHistory.map(l => ({
    id: l.id,
    title: `${l.requested_by.email} ${l.requested_by ? '- ' + formatName(l.requested_by) : ''}`,
    start: dateToCalendarFormat(l.start_time),
    end: dateToCalendarFormat(l.end_time),
    description: l.type.name,
    calendarId: getCalendarId(l.status_display)
}))

const calendars = {
    pending: {
        colorName: 'pending',
        lightColors: {
            main: '#99a1af',
            container: '#e5e7eb',
            onContainer: '#424242'
        },
        darkColors: {
            main: '#cfcfcf',
            container: '#616161',
            onContainer: '#f5f5f5'
        }
    },
    approved: {
        colorName: 'approved',
        lightColors: {
            main: '#0ADD08',
            container: '#b9f8cf',
            onContainer: '#1b5e20'
        },
        darkColors: {
            main: '#81c784',
            container: '#388e3c',
            onContainer: '#e8f5e9'
        }
    },
    declined: {
        colorName: 'declined',
        lightColors: {
            main: '#D32F2F',
            container: '#FFCDD2',
            onContainer: '#B71C1C'
        },
        darkColors: {
            main: '#EF9A9A',
            container: '#B71C1C',
            onContainer: '#FFEBEE'
        }
    }
}

const calendarApp = createCalendar({
    selectedDate: '2025-05-19',
    views: [
        viewMonth,
        createViewMonthAgenda(),
        createViewWeek(),
        createViewDay(),
    ],
    defaultView: viewMonth.name,
    events,
    calendars,
})
</script>