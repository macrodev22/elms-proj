import { defineStore } from "pinia";
import { client } from "../services/client";

export const useStore = defineStore('store', {
    state: () => ({
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
          employeeAvailability: [
            { name: 'Micheal B. Jordan', photo: 'https://t3.ftcdn.net/jpg/03/62/40/80/360_F_362408093_AlwyWJQbyc6edRlXGaGz3xquwzLGXhkX.jpg' },
            { name: 'Arthur Ssenabulya', status: 'sick', photo: 'https://www.shutterstock.com/image-photo/happy-african-american-young-businessman-600nw-1470743381.jpg' },
            { name: 'Namukasa Ritah', status: 'personal', photo: 'https://media.istockphoto.com/id/1488358643/photo/happy-business-portrait-of-black-woman-planning-company-project-goals-and-startup-management.jpg?s=612x612&w=0&k=20&c=hLU-H57nz5HYQkCwqjesjfWtvJEmrBvJ0hGNjc_hAIg=' },
            { name: 'Tiffy L. Tiffany', status: 'available', photo: 'https://www.shutterstock.com/image-photo/happy-attractive-african-business-leader-600nw-2451794349.jpg' },
            { name: 'Irwin Sempebwa', status: 'short', },
            { name: 'Isaac Mutebi', status: 'study', },
          ],
          leaveHistory: [],
          leaveStats: [],
    }),
    getters: {

    },
    actions: {
      async setUser()  {
        try{
          const {data} = await client.get('/auth/user')
          this.auth.user = data.user 
          this.auth.token = data.token
          return data
        } catch(e) {
          throw e
        }
      },
      setLeaveStats() {
        client.get('/hr/report/leave-type-stats')
        .then(({data}) => {
          this.leaveStats = data.map(l => ({
            type: l.type.toLowerCase(),
            count: l.request_count,
            total: l.total_requests
          }))
        })
        .catch(e => {
          console.error('Error getting leave stats', e)
        })
      }
    }      
})