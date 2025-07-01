import { defineStore } from "pinia";
import { client } from "../services/client";
import { formatName, formatPhoto } from "../utils";

export const useStore = defineStore('store', {
    state: () => ({
        showLoginModal: false,
        auth: { 
          user: {
            id: null,
            profile_picture_url: null,
            role_display: "",
            gender_display: "Female",
            last_login: null,
            is_superuser: false,
            first_name: "",
            last_name: "",
            is_staff: false,
            is_active: true,
            date_joined: "",
            email: "",
            role: "",
            profile_picture: null,
            date_of_birth: null,
            middle_name: "",
            contact: {
                "mobile": "",
                "work": ""
            },
            gender: "",
            designation: null,
            company: null,
            department: null,
            supervised_by: null
        },
          token: null,
         },
          holidays: [
            { 'name': 'Holy Thursday', type: 'Optional', date: '2025-04-17' },
            { 'name': 'Good Friday', type: 'Public Holiday', date: '2025-04-18' },
            { 'name': 'Easter Sunday', type: 'Public Holiday', date: '2025-04-20' },
            { 'name': 'Easter Monday', type: 'Public Holiday', date: '2025-04-21' },
            { 'name': 'Labour day', type: 'Public Holiday', date: '2025-05-01' },
          ],
          employeeAvailability: [],
          leaveHistory: [],
          leaveStats: [],
          employeesOnLeave:[],
          employeeOverview: {
            total_employees: 0,
            employees_on_leave: 0,
            used_leave_days: 0,
            remaining_leave_days: 0
        },
    }),
    getters: {

    },
    actions: {
      async setUser()  {
        try{
          const {data} = await client.get('/auth/user')
          this.auth.user = data.user 
          this.auth.token = data.token

          client.defaults.headers.common['Authorization'] = `Bearer ${token}`

          return data
        } catch(e) {
          throw e
        }
      },
      setLeaveStats() {
        client.get('/hr/report/leave-type-stats')
        .then(({data}) => {
          this.leaveStats = data.sort((a,b) => b.request_count - a.request_count)
        })
        .catch(e => {
          console.error('Error getting leave stats', e)
        })
      },
      async setLeaveHistory() {
        try {
          const { data } = await client.get('/hr/leave')
          this.leaveHistory = data
          return data
        } catch(e) {
          throw e
        }
      },
      setTeamAvailability() {
        client.get('/hr/report/team-availability')
        .then(({ data }) => {
          this.employeeAvailability = data.map(ar => ({
            id: ar.employee.id,
            name: formatName(ar.employee),
            status: ar.leave_type || 'Available',
            photo: formatPhoto(ar.employee.profile_picture_url, ar.employee.gender),
          }))
        })
        .catch(e => {
          console.error('team availability', e)
        })
      },
      setEmployeeOverview() {
        client.get('/hr/report/leave-overview')
        .then(res => {
            this.employeeOverview = res.data
        })
      },
      setResources () {
        this.setLeaveStats()
        this.setTeamAvailability()
        this.setLeaveHistory()
      },
      setEmployeesOnLeave() {
        client.get('/employee/on-leave')
        .then(({data}) => this.employeesOnLeave = data)
        .catch(e => console.error('error getting employees on leave', e))
      },
    }      
})