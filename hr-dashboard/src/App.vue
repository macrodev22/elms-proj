<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import { useStore } from './store';
import { client } from './services/client';
import { toast } from 'vue3-toastify';
import NavButton from './components/NavButton.vue';
import Button from './components/Button.vue';
import { PlusIcon } from '@heroicons/vue/24/outline';
import Profile from './components/Profile.vue';
import AddEmployeeModal from './components/AddEmployeeModal.vue';
import LoginModal from './components/LoginModal.vue';

import { RouterView, useRoute } from 'vue-router';

const store = useStore()
const route = useRoute()

const showAddEmployeeModal = ref(false)
// const showLoginModal = ref(false)

onBeforeMount(() => {
  client.get('/auth/user')
    .then(res => {
      // console.log(res)
      const { user, token } = res.data

      store.auth.user = user
      store.auth.token = token
      client.defaults.headers.common['Authorization'] = `Bearer ${token}`


    }).catch(e => {
      console.error('Not logged in', e)
      // toast.error(`Not logged in\n${e.message}`, { position: toast.POSITION.TOP_CENTER })
      store.showLoginModal = true
    })
})

watch(() => store.auth.user, (newUser) => {
  if (newUser) {
    // Other resources
    store.setResources()
  }
})

</script>

<template>
  <div class="bg-green-100 py-2 px-12 relative">
    <AddEmployeeModal :show="showAddEmployeeModal" @close-modal="showAddEmployeeModal = false" />
    <LoginModal :show="store.showLoginModal" @close-modal="store.showLoginModal = false" />
    <div class="flex flex-col gap-6.5 items-center justify-between md:flex-row md:gap-0">
      <div class="h-12"><img src="/favicon.svg" alt="Logo" class="h-full"></div>
      <div class="flex flex-col sm:flex-row gap-6.5 items-stretch justify-between self-stretch my-[-8px]">
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
    <h2 class="text-4xl font-semibold flex gap-2 flex-col sm:flex-row sm:justify-between"><span>Dashboard</span>
      <Button label="Add Employee" @click="showAddEmployeeModal = true">
        <PlusIcon class="size-6" />
      </Button>
    </h2>
  </div>
  <main class="px-4 md:px-12 top-[-4rem] relative">
    <RouterView />
  </main>
</template>

<style scoped></style>
