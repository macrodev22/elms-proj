import { getLeaveColors, formatPhoto, formatName } from "../utils"

const EmployeeCard = ({leaveType, user }) => {

    return (
        <div className="flex flex-col w-full items-center justify-center overflow-x-auto">
            <img src={formatPhoto(user)} alt="" class="size-[200px] rounded-full border-4" style={{borderColor: getLeaveColors(leaveType).highlightColor}} />
            <p className="font-semibold mt-4">{ formatName(user) }</p>
            <p className="text-sm text-gray-400">{ leaveType }</p>
        </div>
    )
}

export default EmployeeCard