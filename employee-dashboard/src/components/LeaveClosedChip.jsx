import { CheckCircleIcon, EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline"

const LeaveClosedChip = (props) => {
    return (
        <div className={props.isClosed ? 'rounded-md border-1 text-center px-3.5 py-1.5 border-green-500 ': 'rounded-md border-1 text-center px-3.5 py-1.5 border-gray-500'}>
            { props.isClosed && <CheckCircleIcon className="size-6 stroke-green-500" /> }
            { !props.isClosed && <EllipsisHorizontalCircleIcon className="size-6" /> }
        </div>
    )
}

export default LeaveClosedChip