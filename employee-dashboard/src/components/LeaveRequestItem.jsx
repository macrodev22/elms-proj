import { formatDate } from "../utils"
import IconButton from "./IconButton"
import LeaveClosedChip from "./LeaveClosedChip"
import StatusChip from "./StatusChip"



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
        <div className="bg-gray-100 rounded-md p-2 text-base flex mb-2">
            <span className="flex-[3] truncate">{ request.type.name }</span>
            <span className="flex-[3] truncate">{ formatDateRange(request) }</span>
            <span className="flex-[1.5]">{ duration(request) }</span>
            <span className="flex-[3] truncate">{ request.reason }</span>
            <span className="flex-[2]">{ request.status }</span>
            <div className="flex gap-2">
                <LeaveClosedChip isClosed={request.closed} />
                <IconButton type="delete" />
            </div>
        </div>
    )
}

export default LeaveRequestItem