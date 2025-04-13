<script setup>
import NavButton from './components/NavButton.vue';
import Button from './components/Button.vue';
import { ChevronDownIcon, PlusIcon } from '@heroicons/vue/24/outline';
import Card from './components/Card.vue';
import LeaveStat from './components/LeaveStat.vue';
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
        <div class="bg-gray-100 p-0.5 rounded-full flex gap-1.5 items-center">
          <div class="flex items-center gap-1">
            <div class="p-1 ml-1">
              <ChevronDownIcon class="size-6" />
            </div>
            <div class="flex flex-col">
              <p class="font-bold text-sm">Ivan Sempebwa</p>
              <p class="text-xs">ivan@gmail.com</p>
            </div>
          </div>
          <img class="w-12 h-12 object-cover rounded-full"
            src="https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?s=612x612&w=0&k=20&c=8ssXDNTp1XAPan8Bg6mJRwG7EXHshFO5o0v9SIj96nY="
            alt="profile photo">
        </div>
      </div>
    </div>
  </div>
  <div class="bg-green-200 py-6 px-12 h-[200px]">
    <h2 class="text-4xl font-semibold flex justify-between"><span>Dashboard</span> <Button label="Add Employee">
        <PlusIcon class="size-6" />
      </Button></h2>
  </div>
  <main class="px-12 top-[-2rem] relative">
    <div class="flex gap-4">
      <Card class="md:w-3/5 flex gap-6 overflow-x-hidden">
        <LeaveStat type="annual" count="2" total="18" />
        <LeaveStat type="sick" count="3" total="18" />
        <LeaveStat type="personal" count="1" total="18" />
        <LeaveStat type="special" count="10" total="18" />
        <LeaveStat type="short" count="5" total="18" />
        <LeaveStat type="annual" count="2" total="18" />

      </Card>
      <Card class="flex-1">
        <h4 class="font-xl">Upcoming public holidays</h4>
      </Card>
    </div>
  </main>
</template>

<style scoped></style>
