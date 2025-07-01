<template>
    <Card>
        <LeaveDetailsModal :leave="selectedLeave" :show="showLeaveDetails" @close-modal="showLeaveDetails = false" />
        <QuickActionModal :show="showQuickAction" :action="quickActionSelected"
            @close-modal="showQuickAction = false" />
        <h2 class="font-bold text-xl mb-3 border-b-gray-50 border-b-2">Leave requests</h2>
        <LeaveItem v-for="leave in sortLeavesByDates(store.leaveHistory)" :key="leave.id" :leave="leave"
            @select="onSelectLeave" @action-click="onShowQuickAction" />
    </Card>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue';
import { useStore } from '../store';
import { client } from '../services/client';
import { toast } from 'vue3-toastify';
import Card from '../components/Card.vue';
import LeaveItem from '../components/LeaveItem.vue';
import LeaveDetailsModal from '../components/LeaveDetailsModal.vue';
import QuickActionModal from '../components/QuickActionModal.vue';

const store = useStore()

const selectedLeave = ref(null)
const showLeaveDetails = ref(false)

const quickActionSelected = ref({ action: '', id: null })
const showQuickAction = ref(false)

onBeforeMount(() => {
    client.get('/hr/leave')
        .then(res => {
            store.leaveHistory = res.data
        })
        .catch(e => {
            toast.error(`Error getting leave history! \n${e.response.data.detail}`, { position: toast.POSITION.TOP_CENTER })
            store.showLoginModal = true
            console.error(e)
        })
})

const onSelectLeave = (leave) => {
    selectedLeave.value = leave
    showLeaveDetails.value = true
}

const onShowQuickAction = (action) => {
    quickActionSelected.value = action
    showQuickAction.value = true
}

const sortLeavesByDates = (leaveHistory) => {
    const now = new Date()

    return [...leaveHistory].sort((a, b) => {

        if (a.closed && !b.closed) return 1
        if (!a.closed && b.closed) return -1
        if (a.closed && b.closed) return 0


        if (a.status_display === 'Pending' && b.status_display !== 'Pending') return -1
        if (b.status_display === 'Pending' && a.status_display !== 'Pending') return 1

        const aStartDiff = Math.abs(new Date(a.start_time) - now)
        const bStartDiff = Math.abs(new Date(b.start_time) - now)
        if (aStartDiff !== bStartDiff) return aStartDiff - bStartDiff

        // If still equal, sort by newest requested_at first
        return new Date(b.requested_at) - new Date(a.requested_at)
    })
}

</script>