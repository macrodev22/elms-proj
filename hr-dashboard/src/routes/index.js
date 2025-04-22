import { createRouter, createWebHistory } from "vue-router";
import Index from "../pages/index.vue";
import Calendar from "../pages/Calendar.vue";
import Leave from "../pages/Leave.vue";
import Reports from "../pages/Reports.vue";

const routes = [
    { path: '/', component: Index, name: 'home'},
    { path: '/calendar', component: Calendar, name: 'calendar'},
    { path: '/leave', component: Leave, name: 'leave'},
    { path: '/reports', component: Reports, name: 'reports'},

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router