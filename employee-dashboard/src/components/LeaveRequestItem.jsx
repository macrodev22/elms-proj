<<<<<<< Updated upstream
import { formatDate } from "../utils"
import IconButton from "./IconButton"
import LeaveClosedChip from "./LeaveClosedChip"
import StatusChip from "./StatusChip"
import { duration } from "../utils"
import { client } from "../services/client"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import toast from "react-hot-toast"

const formatDateRange = (request) => {
    const startDate = new Date(request.start_time)
    const endDate = new Date(request.end_time)
    return `${formatDate(startDate)} - ${formatDate(endDate)}`
}

const ReactSwal = withReactContent(Swal)

const LeaveRequestItem = ({ request, onRefreshRequests, onShowDetails }) => {
    
    const onDeleteRequest = () => {
        ReactSwal.fire({
            title: <p className="font-semibold text-red-500 text-2xl">Are you sure you want to delete this leave request?</p>,
            icon: 'question',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            showCancelButton: true,
            footer: 'This action cannot be undone',
            text: `${request.type.name} - (${formatDateRange(request)})\nReason: ${request.reason}`
        })
        .then(({isConfirmed}) => {
            if(isConfirmed) {
                const del = client.delete(`/employee/leave/${request.id}`)
                toast.promise(del, {
                    loading: 'Deleting leave request...',
                    success: 'The leave request has been closed successfully.\nNo more actions will be possible on it',
                    error: e => `Error deleting leave request!\n${e.response.data.detail || e.message }`
                }).finally(() => {
                    onRefreshRequests()
                })
            }
        })

    }
    
    return (
        <div className="bg-gray-100 rounded-md p-2 text-base flex mb-2 items-center">
            <span className="flex-[3] truncate">{ request.type.name }</span>
            <span className="flex-[3] truncate">{ formatDateRange(request) }</span>
            <span className="flex-[1.5] hidden sm:block">{ duration(request) }</span>
            <span className="flex-[3] truncate hidden sm:block">{ request.reason }</span>
            <span className="flex-[2]"><StatusChip status={request.status_display} /></span>
            <div className="flex gap-2">
                <LeaveClosedChip onClick={() => onShowDetails(request)} isClosed={request.closed} />
                <IconButton type="delete" onClick={onDeleteRequest} />
=======
import IconButton from "./IconButton"
import LeaveClosedChip from "./LeaveClosedChip"
import StatusChip from "./StatusChip"

const formatDate = (date) => {
    const day = date.getDate()
    const year = date.getFullYear()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const suffix = (d) => {
        if (d > 3 && d < 21) return 'th'
        switch(d % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    return `${day}${suffix(day)} ${months[date.getMonth()]} ${year}`
}
const formatDateRange = (request) => {
    const startDate = new Date(request.start_time)
    const endDate = new Date(request.end_time)
    return `${formatDate(startDate)} - ${formatDate(endDate)}`
}

const duration = (request) => {
    const msInDay = 24*60*60*1000
    const { end_time, start_time } = request 

    const d1 = new Date(start_time)
    const d2 = new Date(end_time)
    
    return `${Math.floor(d2-d1)/msInDay} Days`
}

const LeaveRequestItem = (props) => {
    const request = props.request
    
    return (
        <div className="bg-gray-100 rounded-md p-2 text-xl flex mb-2 justify-between">
            <span>{ request.type.name }</span>
            <span>{ formatDateRange(request) }</span>
            <span>{ duration(request) }</span>
            <span>{ request.reason }</span>
            <StatusChip status={request.status_display} />
            <div className="flex gap-2">
                <LeaveClosedChip isClosed={request.closed} />
                <IconButton type="delete" />
>>>>>>> Stashed changes
            </div>
        </div>
    )
}

export default LeaveRequestItem