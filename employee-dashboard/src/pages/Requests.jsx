import { useEffect, useContext, useState } from "react"
import Card from "../components/Card"
import LeaveRequestItem from "../components/LeaveRequestItem"
import StoreContext from "../store/StoreContext"
import LeaveRequestDetails from "../components/LeaveRequestDetails"
// leave requests details
const Requests = () => {

    const ctx = useContext(StoreContext)
    const [selectedRequest, setSelectedRequest] = useState({
            "id": 0,
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
            "reason": "Books are too many for me. Give me some ka time.",
            "closed": false,
            "company": 2,
            "requested_by": 3
        })
    const [showDetails, setShowDetails] = useState(false)
    const [selectedIsQuery, setSelectedIsQuery] = useState(false)

    useEffect(() => {
        ctx.actions.fetchRequests()
        // client.get('/employee/leave-requests')
        // .then(({data}) => {
        //     const {requests,queries} = data
        //     ctx.setRequests(requests)
        // })
        // .catch(e => {
        //     toast.error(`Error getting requests!\n${e.message}`)
        // })
        
    }, [])

    const {requests, queries} = ctx 

    const onSelectLeave = (leave, isQuery) => {
        setSelectedRequest(leave)
        setSelectedIsQuery(isQuery)
        setShowDetails(true)
    }

    return (
        <>
        <LeaveRequestDetails show={showDetails} leave={selectedRequest} onClose={() => setShowDetails(false)} isQuery={selectedIsQuery} />
        <Card className="relative mt-[-40px] md:mt-[-80px]">
            { queries?.length && (
                <>
                <h2 className="font-semibold text-2xl mb-4">Queries to me</h2>
                { queries.map(q => <LeaveRequestItem request={q.leave_request} key={q.id} onRefreshRequests={() => ctx.actions.fetchRequests() } onShowDetails={onSelectLeave} isQuery={true} />) }
                </>
            ) }
            <h2 className="font-semibold text-2xl mb-4">My requests</h2>
            { requests.map(r => <LeaveRequestItem request={r} key={r.id} onRefreshRequests={() => ctx.actions.fetchRequests()} onShowDetails={onSelectLeave} isQuery={false} />) }
        </Card>
        </>
    )
}

export default Requests
