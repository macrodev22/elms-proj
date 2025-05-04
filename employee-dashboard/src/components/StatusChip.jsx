
const StatusChip = (props) => {
    return (
        <span className={`px-2 py-1 rounded-md w-[7rem] text-lg text-center ${props.status == 'Pending' && 'bg-gray-300'} ${props.status == 'Approved' && 'bg-green-300'} ${props.status == 'Declined' && 'bg-amber-300'}`}>
            { props.status }
        </span>
    )
}

export default StatusChip