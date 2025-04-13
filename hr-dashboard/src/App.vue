<script setup>
import { ref } from 'vue';
import NavButton from './components/NavButton.vue';
import Button from './components/Button.vue';
import { PlusIcon } from '@heroicons/vue/24/outline';
import Card from './components/Card.vue';
import LeaveStat from './components/LeaveStat.vue';
import ForwardButton from './components/ForwardButton.vue';
import Profile from './components/Profile.vue';
import EmployeeAvailability from './components/EmployeeAvailability.vue';
import PublicHolidayList from './components/PublicHolidayList.vue';
import LeaveHistory from './components/LeaveHistory.vue';

const leaveStatsContainer = ref(null)
const employeeAvailabilityContainer = ref(null)

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

const holidays = [
  { 'name': 'Holy Thursday', type: 'Optional', date: '17/04/2025' },
  { 'name': 'Good Friday', type: 'Public Holiday', date: '18/04/2025' },
  { 'name': 'Easter Sunday', type: 'Public Holiday', date: '20/04/2025' },
  { 'name': 'Easter Monday', type: 'Public Holiday', date: '21/04/2025' },
  { 'name': 'Labour day', type: 'Public Holiday', date: '01/05/2025' },

]

</script>

<template>
  <div class="bg-green-100 py-2 px-12">
    <div class="flex justify-between items-center">
      <div class="h-12"><img src="/favicon.svg" alt="Logo" class="h-full"></div>
      <div class="flex gap-6.5 items-stretch self-stretch">
        <NavButton label="Home" href="#" />
        <NavButton label="Action" href="#" />
        <NavButton label="Leave" href="#" />
        <NavButton label="Reports" href="#" />
      </div>
      <div>
        <Profile name="Ivan Sempebwa" email="ivan@gmail.com"
          photo="https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?s=612x612&w=0&k=20&c=8ssXDNTp1XAPan8Bg6mJRwG7EXHshFO5o0v9SIj96nY=" />
      </div>
    </div>
  </div>
  <div class="bg-green-200 py-6 px-12 h-[200px]">
    <h2 class="text-4xl font-semibold flex justify-between"><span>Dashboard</span> <Button label="Add Employee">
        <PlusIcon class="size-6" />
      </Button></h2>
  </div>
  <main class="px-12 top-[-2rem] relative">
    <div class="flex gap-8 mb-8 h-52">
      <Card class="relative md:w-3/5">
        <div class="flex gap-6 overflow-x-auto scroll-smooth scroll-hide" ref="leaveStatsContainer">
          <LeaveStat type="annual" :count="2" :total="18" />
          <LeaveStat type="sick" :count="3" :total="18" />
          <LeaveStat type="personal" :count="1" :total="18" />
          <LeaveStat type="special" :count="17" :total="18" />
          <LeaveStat type="short" :count="5" :total="18" />
          <LeaveStat type="annual" :count="2" :total="18" />

        </div>
        <ForwardButton @click="rightScroll(leaveStatsContainer)"
          class="absolute right-0 top-[50%] translate-x-[50%] translate-y-[-50%] z-10" />
      </Card>
      <Card class="flex-1 overflow-y-hidden">
        <h4 class="font-xl mb-2">Upcoming public holidays</h4>
        <PublicHolidayList :holidays="holidays" />
      </Card>
    </div>
    <div class="flex gap-8 mb-8">
      <div class="relative md:w-3/5">
        <Card>
          <h4 class="mb-4">Team availability</h4>
          <div class="flex gap-4 overflow-x-auto scroll-smooth scroll-hide" ref="employeeAvailabilityContainer">
            <EmployeeAvailability name="Micheal B. Jordan"
              photo="https://t3.ftcdn.net/jpg/03/62/40/80/360_F_362408093_AlwyWJQbyc6edRlXGaGz3xquwzLGXhkX.jpg" />
            <EmployeeAvailability name="Arthur Ssenabulya" status="sick" />
            <EmployeeAvailability name="Namukasa Ritah" status="personal" />
            <EmployeeAvailability name="Tiffy L. Tiffany" status="available" />
            <EmployeeAvailability name="Irwin Sempebwa" status="short" />
            <EmployeeAvailability name="Isaac Mutebi" status="study" />

          </div>
        </Card>
        <ForwardButton @click="rightScroll(employeeAvailabilityContainer)"
          class="absolute right-0 top-[50%] translate-x-[50%] translate-y-[-50%] z-10" />
      </div>
      <Card class="flex-1">
        <h4>Quick links</h4>
      </Card>
    </div>
    <div class="flex gap-8">
      <Card class=" md:w-3/5">
        <h4 class="mb-2">Leave history</h4>
        <LeaveHistory />
      </Card>
    </div>
  </main>
</template>

<style scoped>
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
