import { useEffect, useContext, useState } from "react"
import Card from "../components/Card"
import LeaveRequestItem from "../components/LeaveRequestItem"
import StoreContext from "../store/StoreContext"
import LeaveRequestDetails from "../components/LeaveRequestDetails"
import toast from "react-hot-toast"
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
    const [selectedQueryId, setSelectedQueryId] = useState(null)
    const [selectedQueryHRUser, setSelectedQueryHRUser] = useState(null)
    const [supervisorRemarks, setSupervisorRemarks] = useState("")
    const [hrRemarks, setHrRemarks] = useState("")
    const [hrRemarksDate, setHrRemarksDate] = useState("")

    useEffect(() => {
        ctx.actions.fetchRequests()    
    }, [])

    const {requests, queries} = ctx 
    const onRespond = () => {
        if (supervisorRemarks.trim() == '') {
            return toast.error('Supervisor remarks are required to respond')
        }
        ctx.actions.updateSupervisorQuery(selectedQueryId, supervisorRemarks)
        setSupervisorRemarks('')
    }
    const onSelectLeave = (leave, isQuery,queryId, hrRemarks, hrRemarksDate, hrUser) => {
        setSelectedRequest(leave)
        setSelectedIsQuery(isQuery)
        setSelectedQueryId(queryId)
        setHrRemarks(hrRemarks)
        setHrRemarksDate(hrRemarksDate)
        setSelectedQueryHRUser(hrUser)
        setShowDetails(true)
    }

    return (
        <>
        <LeaveRequestDetails show={showDetails} 
        leave={selectedRequest} 
        onClose={() => setShowDetails(false)} 
        isQuery={selectedIsQuery} 
        onRespond={onRespond} 
        supervisorRemarks={supervisorRemarks}
        onSetSupervisorRemarks={setSupervisorRemarks}
        hrRemarks={hrRemarks}
        hrRemarksDate={hrRemarksDate}
        hrUser={selectedQueryHRUser}
        />
        <Card className="relative mt-[-40px] md:mt-[-80px]">
            { queries?.length && (
                <>
                <h2 className="font-semibold text-2xl mb-4">Queries to me</h2>
                { queries.map(q => <LeaveRequestItem request={q.leave_request} key={q.id} onRefreshRequests={() => ctx.actions.fetchRequests() } onShowDetails={onSelectLeave} isQuery={true} queryId={q.id} hrRemarks={q.hr_remarks} hrRemarksDate={q.created_at} hrUser={q.sent_by}  />) }
                </>
            ) }
            <h2 className="font-semibold text-2xl mb-4">My requests</h2>
            { requests.map(r => <LeaveRequestItem request={r} key={r.id} onRefreshRequests={() => ctx.actions.fetchRequests()} onShowDetails={onSelectLeave} isQuery={false} />) }
        </Card>
        </>
    )
}

export default Requests
