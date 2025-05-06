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
          leaveHistory: [
            {
              id: 1,
              type: {
                  "id": 7,
                  "name": "Sabbatical Leave",
                  "description": "Extended periods off for personal projects, research, or study"
              },
              status_display: "Pending",
              requested_at: "2025-04-16T17:06:35.338636Z",
              start_time: "2025-04-23T17:05:45Z",
              end_time: "2025-04-27T18:00:00Z",
              status: "PNDG",
              reason: "Going for vaccation",
              closed: false,
              company: 2,
              requested_by: 4
          },{
            id: 2,
            type: {
                "id": 7,
                "name": "Sabbatical Leave",
                "description": "Extended periods off for personal projects, research, or study"
            },
            status_display: "Approved",
            requested_at: "2025-04-16T17:06:35.338636Z",
            start_time: "2025-05-23T17:05:45Z",
            end_time: "2025-06-12T18:00:00Z",
            status: "APPR",
            reason: "Studying swaswa is kawa",
            closed: true,
            company: 2,
            requested_by: 4
        },{
          id: 3,
          type: {
              "id": 7,
              "name": "Sabbatical Leave",
              "description": "Extended periods off for personal projects, research, or study"
          },
          status_display: "Declined",
          requested_at: "2025-04-16T17:06:35.338636Z",
          start_time: "2025-04-23T17:05:45Z",
          end_time: "2025-04-27T18:00:00Z",
          status: "DCLN",
          reason: "Study is kawa",
          closed: true,
          company: 2,
          requested_by: 4
          },
          {
            "id": 4,
            "type": {
                "id": 1,
                "name": "Annual Leave (Holiday Entitlement)",
                "description": "A set amount of time off that employees are legally entitled to for vacations or personal relaxation"
            },
            "status_display": "Pending",
            "requested_at": "2025-05-03T17:32:51.747074Z",
            "start_time": "2025-05-18T00:00:00Z",
            "end_time": "2025-05-22T00:00:00Z",
            "status": "PNDG",
            "reason": "To catch some fresh air",
            "closed": false,
            "company": 2,
            "requested_by": 6
        },
        {
            "id": 5,
            "type": {
                "id": 4,
                "name": "Personal Leave",
                "description": "Used for personal reasons such as family events or appointments"
            },
            "status_display": "Approved",
            "requested_at": "2025-05-03T17:33:39.662125Z",
            "start_time": "2025-05-18T00:00:00Z",
            "end_time": "2025-05-24T00:00:00Z",
            "status": "APPR",
            "reason": "To catch some fresh air",
            "closed": true,
            "company": 2,
            "requested_by": 6
        },
        {
            "id": 6,
            "type": {
                "id": 3,
                "name": "Maternity Leave",
                "description": "Leave for new mothers, often including both prenatal and postnatal periods"
            },
            "status_display": "Declined",
            "requested_at": "2025-05-03T17:35:14.907066Z",
            "start_time": "2025-06-17T00:00:00Z",
            "end_time": "2025-06-30T00:00:00Z",
            "status": "DCLN",
            "reason": "To catch some fresh air",
            "closed": true,
            "company": 2,
            "requested_by": 6
        },
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