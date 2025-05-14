import { CheckCircleIcon, EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline"

const LeaveClosedChip = (props) => {
    return (
        <button className={!props.isClosed ? 'cursor-pointer rounded-md border-1 text-center px-3.5 py-1.5 border-green-500 hover:bg-green-400 hover:[&>svg]:stroke-white': 'cursor-pointer rounded-md border-1 text-center px-3.5 py-1.5 border-gray-500 hover:bg-gray-400 hover:[&>svg]:stroke-white'}>
            { props.isClosed && <CheckCircleIcon className="size-6 stroke-gray-500" /> }
            { !props.isClosed && <EllipsisHorizontalCircleIcon className="size-6 stroke-green-500" /> }
        </button>
    )
}

export default LeaveClosedChip