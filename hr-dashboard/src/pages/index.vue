<template>
    <div class="flex flex-col md:flex-row gap-8 mb-8 h-52">
        <Card class="relative md:w-3/5 w-[100%]">
            <div class="flex gap-6 overflow-x-auto scroll-smooth scroll-hide" ref="leaveStatsContainer">
                <LeaveStat v-for="stat in store.leaveStats" :key="stat.id" :type="stat.type" :count="stat.request_count"
                    :total="stat.total_requests" />


            </div>
            <ForwardButton @click="rightScroll(leaveStatsContainer)"
                class="absolute right-0 top-[50%] translate-x-[50%] translate-y-[-50%] z-10" />
        </Card>
        <Card class="md:flex-1 h-52 md:overflow-y-hidden">
            <h4 class="text-2xl mb-4">Upcoming public holidays</h4>
            <PublicHolidayList :holidays="store.holidays" />
        </Card>
    </div>
    <div class="flex flex-col mt-64 md:flex-row md:mt-0 gap-8 mb-8 md:h-36">
        <div class="relative md:w-3/5">
            <Card>
                <h4 class="mb-4 text-2xl">Team availability</h4>
                <div class="flex gap-4 overflow-x-auto scroll-smooth scroll-hide" ref="employeeAvailabilityContainer">
                    <EmployeeAvailability v-for="employee in store.employeeAvailability" :name="employee.name"
                        :status="employee.status" :photo="employee.photo" :key="employee.name" />
                </div>
            </Card>
            <ForwardButton @click="rightScroll(employeeAvailabilityContainer)"
                class="absolute right-0 top-[50%] translate-x-[50%] translate-y-[-50%] z-10" />
        </div>
        <div class="md:flex-1">
            <Card>
                <h4 class="mb-4 text-2xl">Quick links</h4>
                <QuickLink label="Add department" to="#" @click.prevent="showAddDeparment = true" />
                <QuickLink label="Leave conflict" to="#" />
                <QuickLink label="Request leave" to="#" />
                <QuickLink label="Leave balance" to="#" />
            </Card>
            <Card class="mt-6">
                <h2 class="font-bold text-xl ">Birthdays</h2>
            </Card>
        </div>
    </div>
    <div class="flex gap-8">
        <Card class=" md:w-3/5">
            <h4 class="mb-2 text-2xl">Leave history</h4>
            <LeaveHistory v-for="leave in sortLeavesByPriority(store.leaveHistory)" :key="leave.id" :leave="leave" />
        </Card>
    </div>
    <AddDepartmentModal :show="showAddDeparment" @close-modal="showAddDeparment = false" />
</template>
<style lang="css" scoped>
.scroll-hide {
    overflow-x: auto;
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* IE and Edge */
}

.scroll-hide::-webkit-scrollbar {
    display: none;
    /* WebKit browsers */
}
</style>

<script setup>
import { ref } from 'vue';
import { useStore } from '../store';
import EmployeeAvailability from '../components/EmployeeAvailability.vue';
import PublicHolidayList from '../components/PublicHolidayList.vue';
import LeaveHistory from '../components/LeaveHistory.vue';
import QuickLink from '../components/QuickLink.vue';
import Card from '../components/Card.vue';
import LeaveStat from '../components/LeaveStat.vue';
import ForwardButton from '../components/ForwardButton.vue';
import AddDepartmentModal from '../components/AddDepartmentModal.vue';

const store = useStore()

const leaveStatsContainer = ref(null)
const employeeAvailabilityContainer = ref(null)

const showAddDeparment = ref(false)

const rightScroll = (container) => {
    // console.log('scrolling ', container)

    const width = container.clientWidth
    const maxLeftScroll = container.scrollWidth - width
    if (container.scrollLeft >= maxLeftScroll) {
        container.scrollLeft = 0
    } else
        container.scrollBy({
            left: width - 20,
            behavior: 'smooth'
        })
}

const sortLeavesByPriority = (leaveHistory) => {
    return [...leaveHistory].sort((a, b) => {
        const aStartTime = new Date(a.start_time)
        const bStartTime = new Date(b.start_time)

        let order = 0
        if (aStartTime < bStartTime) order -= 5
        if (a.status_display == 'Pending') order -= 7
        if (a.closed) order += 6
        return order
    }).slice(0, 5)
}

</script>