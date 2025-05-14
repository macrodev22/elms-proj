import { formatDate } from "../utils"
import IconButton from "./IconButton"
import LeaveClosedChip from "./LeaveClosedChip"
import StatusChip from "./StatusChip"
import { duration } from "../utils"

const formatDateRange = (request) => {
    const startDate = new Date(request.start_time)
    const endDate = new Date(request.end_time)
    return `${formatDate(startDate)} - ${formatDate(endDate)}`
}


const LeaveRequestItem = (props) => {
    const request = props.request
    
    return (
        <div className="bg-gray-100 rounded-md p-2 text-base flex mb-2 items-center">
            <span className="flex-[3] truncate">{ request.type.name }</span>
            <span className="flex-[3] truncate">{ formatDateRange(request) }</span>
            <span className="flex-[1.5]">{ duration(request) }</span>
            <span className="flex-[3] truncate">{ request.reason }</span>
            <span className="flex-[2]"><StatusChip status={request.status_display} /></span>
            <div className="flex gap-2">
                <LeaveClosedChip isClosed={request.closed} />
                <IconButton type="delete" />
            </div>
        </div>
    )
}

export default LeaveRequestItem