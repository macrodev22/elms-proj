
const StatusChip = (props) => {
    return (
        <div className={`px-0.5 sm:px-2 py-1 rounded-md sm:w-26 text-sm text-center 
        ${props.status == 'Pending' && 'bg-gray-300'} ${props.status == 'Approved' && 'bg-green-300'} ${props.status == 'Declined' && 'bg-amber-300'}`}>
            { props.status }
        </div>
    )
}

export default StatusChip