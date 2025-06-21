import { useEffect, useContext, useState } from "react"
import Card from "../components/Card"
import LeaveRequestItem from "../components/LeaveRequestItem"
import { client } from "../services/client"
import toast from "react-hot-toast"
import StoreContext from "../store/StoreContext"
import LeaveRequestDetails from "../components/LeaveRequestDetails"
// leave requests details
const Requests = () => {

<<<<<<< Updated upstream
    const ctx = useContext(StoreContext)
    const [selectedRequest, setSelectedRequest] = useState({
            "id": 0,
=======
    const requests = [
        {
            "id": 3,
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
            "id": 4,
            "type": {
                "id": 1,
                "name": "Annual Leave (Holiday Entitlement)",
                "description": "A set amount of time off that employees are legally entitled to for vacations or personal relaxation"
            },
            "status_display": "Declined",
            "requested_at": "2025-05-03T17:33:39.662125Z",
            "start_time": "2025-05-18T00:00:00Z",
            "end_time": "2025-05-22T00:00:00Z",
            "status": "DCLN",
            "reason": "To catch some fresh air",
            "closed": true,
            "company": 2,
            "requested_by": 6
        },
        {
            "id": 5,
>>>>>>> Stashed changes
            "type": {
                "id": 7,
                "name": "Sabbatical Leave",
                "description": "Extended periods off for personal projects, research, or study"
            },
            "status_display": "Approved",
<<<<<<< Updated upstream
            "requested_at": "2025-05-08T16:12:45.692911Z",
            "start_time": "2025-05-09T06:00:00Z",
            "end_time": "2025-05-15T18:00:00Z",
            "status": "APPR",
            "reason": "Books are too many for me. Give me some ka time.",
            "closed": false,
=======
            "requested_at": "2025-05-03T17:35:14.907066Z",
            "start_time": "2025-05-18T00:00:00Z",
            "end_time": "2025-05-22T00:00:00Z",
            "status": "APPR",
            "reason": "To catch some fresh air",
            "closed": true,
>>>>>>> Stashed changes
            "company": 2,
            "requested_by": 3
        })
    const [showDetails, setShowDetails] = useState(false)

    useEffect(() => {
        client.get('/employee/leave-requests')
        .then(({data}) => {
            const {requests} = data
            ctx.setRequests(requests)
        })
        .catch(e => {
            toast.error(`Error getting requests!\n${e.message}`)
        })
        
    }, [])

    const {requests, queries} = ctx 

    const onSelectLeave = (leave) => {
        setSelectedRequest(leave)
        setShowDetails(true)
    }

    return (
        <>
        <LeaveRequestDetails show={showDetails} leave={selectedRequest} onClose={() => setShowDetails(false)} />
        <Card className="relative mt-[-40px] md:mt-[-80px]">
            { queries?.length && (
                <>
                <h2 className="font-semibold text-2xl mb-4">Queries to me</h2>
                { queries.map(q => <LeaveRequestItem request={q.leave_request} key={q.id} onRefreshRequests={() => ctx.actions.fetchRequests() } onShowDetails={onSelectLeave} />) }
                </>
            ) }
            <h2 className="font-semibold text-2xl mb-4">My requests</h2>
            { requests.map(r => <LeaveRequestItem request={r} key={r.id} onRefreshRequests={() => ctx.actions.fetchRequests()} onShowDetails={onSelectLeave} />) }
        </Card>
        </>
    )
}

export default Requests
