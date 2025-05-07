<template>
    <Card>
        <LeaveDetailsModal :leave="selectedLeave" :show="showLeaveDetails" @close-modal="showLeaveDetails = false" />
        <h2 class="font-bold text-xl mb-3 border-b-gray-50 border-b-2">Leave requests</h2>
        <LeaveItem v-for="leave in store.leaveHistory" :key="leave.id" :leave="leave" @select="onSelectLeave" />
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

const store = useStore()

const selectedLeave = ref(null)
const showLeaveDetails = ref(false)

onBeforeMount(() => {
    client.get('/hr/leave')
        .then(res => {
            store.leaveHistory = res.data
        })
        .catch(e => {
            toast.error(`Error getting leave history! \n${e.response.data.detail}`)
            console.error(e)
        })
})

const onSelectLeave = (leave) => {
    selectedLeave.value = leave
    showLeaveDetails.value = true
}

</script>