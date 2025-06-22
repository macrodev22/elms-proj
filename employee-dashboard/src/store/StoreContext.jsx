import { useState, createContext } from "react";
import { client } from "../services/client";
import toast from "react-hot-toast";


const StoreContext = createContext({
    auth: { user: {
        "id": 3,
        "profile_picture_url": "http://localhost:8000/media/profile_pictures/m_32_ZgrQj3H.jpg",
        "role_display": "Human Resource",
        "gender_display": "Male",
        "company": {
            "id": 2,
            "name": "Intek Travel",
            "email": "info@intek.travel",
            "website": "https://www.intektravel.com",
            "address": "Naguru, Kampala",
            "contact": "0414123456",
            "created_at": "2025-04-11T15:01:12.644281Z",
            "updated_at": "2025-04-11T15:01:12.644308Z",
            "num_employees": 15,
            "work_start_time": "08:30:00",
            "work_end_time": "05:30:00"
        },
        "first_name": "John",
        "last_name": "Smite",
        "is_active": true,
        "date_joined": "2025-04-16T12:40:11Z",
        "email": "john@gmail.com",
        "role": "HR",
        "profile_picture": "http://localhost:8000/media/profile_pictures/m_32_ZgrQj3H.jpg",
        "date_of_birth": "1987-05-15",
        "middle_name": "Fahrenheit",
        "contact": {
            "mobile": "0764258147",
            "work": "0770123456"
        },
        "gender": "M",
        "designation": "Human Resource Manager",
        "department": 5,
        "supervised_by": 2,
        "supervisor": {
            "id": 2,
            "password": "testpassword",
            "first_name": "Joan",
            "last_name": "Jowie",
            "is_active": true,
            "date_joined": "2025-04-11T15:01:19Z",
            "email": "joan@intek.travel",
            "role": "EM",
            "profile_picture": null,
            "date_of_birth": null,
            "middle_name": null,
            "contact": {
                "mobile": "",
                "work": ""
            },
            "gender": "M",
            "designation": null,
            "company": 2,
            "department": 3,
            "supervised_by": 6
        },
    }, 
    token: null },
    showLogin: false,
    showUpdate: false,
    requests: [
        {
            "id": 9,
            "type": {
                "id": 7,
                "name": "Sabbatical Leave",
                "description": "Extended periods off for personal projects, research, or study"
            },
            "status_display": "Approved",
            "requested_at": "2025-05-08T16:12:45.692911Z",
            "start_time": "2025-05-09T06:00:00Z",
            "end_time": "2025-05-15T18:00:00Z",
            "status": "APPR",
            "duration": 3,
            "reason": "Books are too many for me. Give me some ka time.",
            "closed": false,
            "company": 2,
            "requested_by": 3
        },
    ],
    queries: [ 
        {
            "id": 2,
            "leave_request": {
                "id": 17,
                "type": {
                    "id": 7,
                    "name": "Sabbatical Leave",
                    "description": "Extended periods off for personal projects, research, or study"
                },
                "status_display": "Pending",
                "requested_at": "2025-05-13T18:19:35.089993Z",
                "start_time": "2025-05-17T00:19:00Z",
                "end_time": "2025-05-23T21:19:00Z",
                "status": "PNDG",
                "duration": 2,
                "reason": "Papers are near. Some time off",
                "closed": false,
                "company": 2,
                "requested_by": 17
            },
            "created_at": "2025-05-13T18:27:14.718760Z",
            "updated_at": "2025-05-13T18:27:14.726753Z",
            "hr_remarks": "Which papers are those?",
            "supervisor_remarks": null,
            "closed": false,
            "sent_by": {
                "first_name": "John",
                "middle_name": "Fahrenheit",
                "last_name": "Smite",
                "email": "john@gmail.com",
                "role": "HR",
                "contact": {
                    "mobile": "0764258147",
                    "work": "0770123456"
                },
                "gender": "M"
            },
            "sent_to": 4,
            "leave_process": 34
        },
     ],
     stats: {
    "total_leave_days": 21,
    "days_used": 2,
    "days_pending_approval": 19
    },
    setShowLogin() {},
    setShowUpdate(){},
    setUser(){},
    setToken(){},
    setRequests(){},
    actions: {
        fetchRequests(){},
        fetchUser(){},
        fetchStats(){},
        updateSupervisorQuery(queryId, supervisorRemarks){ queryId && supervisorRemarks },
    }
})

export const StoreContextProvider = (props) => {

    const [user, setUser] = useState({id:17, company: 2, first_name:'Alexander', last_name: 'Kinyera'})
    const [token, setToken] = useState('')
    const [requests, setRequests] = useState([])
    const [queries, setQueries] = useState([])
    const [showLogin, setShowLogin] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [stats, setStats] = useState({"total_leave_days": 0, "days_used": 0, "days_pending_approval": 0})

    const fetchRequests = () => {
        return client.get('/employee/leave-requests')
        .then(({data}) => {
            const { requests, queries } = data
            setRequests(requests)
            setQueries(queries)
        })
        .catch(e => console.error('error fetching requests', e))
    }

    const fetchUser = () => {
        client.get('/auth/user')
        .then(({data}) => {
      const { user, token } = data
      setUser(user)
      setToken(token)
      client.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchRequests()
      setShowLogin(false)
        }).catch(e => {
      setShowLogin(true)
      console.error('error authenticating user',e)
        })
    }

    const fetchStats = () => {
        client.get('/employee/leave-stats')
        .then(({ data }) => {
            setStats(data)
        })
        .catch(e => {
            console.error('error fetching stats', e)
        })
    }

    const updateSupervisorQuery = (queryId, supervisorRemarks) => {
        client.post(`/employee/supervisor-remark/${queryId}`, {
            "supervisor_remarks": supervisorRemarks
        }).then(() => {
            fetchRequests()
        }).catch(e => {
            toast.error(`Error making supervisor remarks\n${e.response?.data?.detail | e.status}`)
        })

    }

    return <StoreContext.Provider value={{
        auth: { user: user, token: token },
        requests,
        queries,
        showLogin,
        showUpdate,
        stats,
        setUser,
        setToken,
        setRequests,
        setQueries,
        setShowLogin,
        setShowUpdate,
        actions: {
            fetchRequests,
            fetchUser,
            fetchStats,
            updateSupervisorQuery,
        }
    }}>
        {props.children}
    </StoreContext.Provider>
}


export default StoreContext