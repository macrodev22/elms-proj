const getChipColor = status => {
    if(status == 'Pending') return 'bg-gray-300'
    if(status == 'Approved') return 'bg-green-300'
    if(status == 'Declined') return 'bg-amber-300'
    if(status == 'Cancelled') return 'bg-red-300'
}


const StatusChip = (props) => {
    return (
        <div className={`px-0.5 sm:px-2 py-1 rounded-md sm:w-26 text-sm text-center 
        ${getChipColor(props.status)}`}>
            { props.status }
        </div>
    )
}

export default StatusChip