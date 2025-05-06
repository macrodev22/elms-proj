<script setup>
import { ref } from 'vue';
import { useStore } from './store';
import NavButton from './components/NavButton.vue';
import Button from './components/Button.vue';
import { PlusIcon } from '@heroicons/vue/24/outline';
import Profile from './components/Profile.vue';
import AddEmployeeModal from './components/AddEmployeeModal.vue';

import { RouterView, useRoute } from 'vue-router';

const store = useStore()
const route = useRoute()

const showAddEmployeeModal = ref(false)

</script>

<template>
  <div class="bg-green-100 py-2 px-12 relative">
    <AddEmployeeModal :show="showAddEmployeeModal" @close-modal="showAddEmployeeModal = false" />
    <div class="flex justify-between items-center">
      <div class="h-12"><img src="/favicon.svg" alt="Logo" class="h-full"></div>
      <div class="flex gap-6.5 items-stretch self-stretch my-[-8px]">
        <NavButton label="Home" href="/" :active="route.name == 'home'" />
        <NavButton label="Calendar" href="/calendar" :active="route.name == 'calendar'" />
        <NavButton label="Leave" :href="{ name: 'leave' }" :active="route.name == 'leave'" />
        <NavButton label="Reports" :href="{ name: 'reports' }" :active="route.name == 'reports'" />
      </div>
      <div>
        <Profile :user="store.auth.user" />
      </div>
    </div>
  </div>
  <div class="bg-green-200 py-6 px-12 h-[180px]">
    <h2 class="text-4xl font-semibold flex justify-between"><span>Dashboard</span>
      <Button label="Add Employee" @click="showAddEmployeeModal = true">
        <PlusIcon class="size-6" />
      </Button>
    </h2>
  </div>
  <main class="px-12 top-[-4rem] relative">
    <RouterView />
  </main>
</template>

<style scoped></style>
