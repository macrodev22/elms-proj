const LeaveRequestItem = (props) => {
    const request = props.request
    const formatDateRange = (request) => {
        return `18th May 2025 - 22nd May 2025`
    }

    const duration = (request) => {
        return '3 Days'
    }
    return (
        <div className="bg-gray-100 rounded-md p-2 text-base flex mb-2">
            <span className="flex-[3] truncate">{ request.type.name }</span>
            <span className="flex-[3] truncate">{ formatDateRange(request) }</span>
            <span className="flex-[1.5]">{ duration(request) }</span>
            <span className="flex-[3] truncate">{ request.reason }</span>
            <span className="flex-[2]">{ request.status }</span>
            <div className="w-32"></div>
        </div>
    )
}

export default LeaveRequestItem