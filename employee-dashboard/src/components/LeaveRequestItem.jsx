const LeaveRequestItem = (props) => {
    const request = props.request
    const formatDateRange = (request) => {
        return `18th May 2025 - 22nd May 2025`
    }

    const duration = (request) => {
        return '3 Days'
    }
    return (
        <div className="bg-gray-100 rounded-md p-2 text-xl flex mb-2">
            <span>{ request.type.name }</span>
            <span>{ formatDateRange(request) }</span>
            <span>{ duration(request) }</span>
            <span>{ request.reason }</span>
            <span>{ request.status }</span>
        </div>
    )
}

export default LeaveRequestItem