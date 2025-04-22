import { defineStore } from "pinia";

export const useStore = defineStore('store', {
    state: () => ({
        auth: { user: {
            id: 2,
            last_login: null,
            is_superuser: false,
            first_name: "Ivan",
            last_name: "Sempebwa",
            is_staff: false,
            is_active: true,
            date_joined: "2025-04-11T15:01:19Z",
            email: "ivan@gmail.com",
            role: "EM",
            profile_picture: "https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?s=612x612&w=0&k=20&c=8ssXDNTp1XAPan8Bg6mJRwG7EXHshFO5o0v9SIj96nY=",
            date_of_birth: null,
            middle_name: null,
            contact: {
              mobile: "256770123456",
              work: "256414452645/3"
            },
            gender: "M",
            company: 2,
            department: 3,
            supervised_by: 6
          } },
          holidays: [
            { 'name': 'Holy Thursday', type: 'Optional', date: '17/04/2025' },
            { 'name': 'Good Friday', type: 'Public Holiday', date: '18/04/2025' },
            { 'name': 'Easter Sunday', type: 'Public Holiday', date: '20/04/2025' },
            { 'name': 'Easter Monday', type: 'Public Holiday', date: '21/04/2025' },
            { 'name': 'Labour day', type: 'Public Holiday', date: '01/05/2025' },
          ],
          employeeAvailability: [
            { name: 'Micheal B. Jordan', photo: 'https://t3.ftcdn.net/jpg/03/62/40/80/360_F_362408093_AlwyWJQbyc6edRlXGaGz3xquwzLGXhkX.jpg' },
            { name: 'Arthur Ssenabulya', status: 'sick', photo: 'https://www.shutterstock.com/image-photo/happy-african-american-young-businessman-600nw-1470743381.jpg' },
            { name: 'Namukasa Ritah', status: 'personal', photo: 'https://media.istockphoto.com/id/1488358643/photo/happy-business-portrait-of-black-woman-planning-company-project-goals-and-startup-management.jpg?s=612x612&w=0&k=20&c=hLU-H57nz5HYQkCwqjesjfWtvJEmrBvJ0hGNjc_hAIg=' },
            { name: 'Tiffy L. Tiffany', status: 'available', photo: 'https://www.shutterstock.com/image-photo/happy-attractive-african-business-leader-600nw-2451794349.jpg' },
            { name: 'Irwin Sempebwa', status: 'short', },
            { name: 'Isaac Mutebi', status: 'study', },
          ],
          leaveHistory: [
            { type: 'Annual leave', dates: '5th May - 10th May', duration: '6 Days', reason: 'Going for vaccation', status: 'Approved' },
            { type: 'Personal leave', dates: '15th May - 20th May', duration: '6 Days', reason: 'Going for vaccation', status: 'Cancelled' },
            { type: 'Sick leave', dates: '4th May - 6th May', duration: '6 Days', reason: 'Going for vaccation', status: 'Pending' },
            { type: 'Sabatical leave', dates: '1st May - 11th May', duration: '6 Days', reason: 'Going for vaccation', status: 'Rejected' },
          ],
          leaveStats: [
            {type: 'annual', count: 2, total: 18 },
            {type: 'sick', count: 4, total: 18 },
            {type: 'personal', count: 7, total: 18 },
            {type: 'special', count: 12, total: 18 },
            {type: 'short', count: 5, total: 18 },
            {type: 'annual', count: 2, total: 18 },
          ],
    }),
    getters: {

    },
    actions: {

    }      
})