import Modal from "./Modal";
import StatusChip from "./StatusChip";
import { formatName, duration, formatDate } from "../utils";
import { useContext } from "react";
import StoreContext from "../store/StoreContext";

const LeaveRequestDetails = ({ leave, show, onClose, showRemarksField=false}) => {
    const ctx = useContext(StoreContext)

    return (
        <Modal show={show} onClose={onClose} title="Leave details">
            <div class="flex gap-4 mb-4">
            {leave.closed && <span class="text-yellow-500">This leave request was closed
            </span>}
            <StatusChip status={leave.status_display} />
        </div>
        <div class="grid grid-cols-[1fr_3fr] gap-x-2 gap-y-2">
            <p>Type:</p>
            <p>{ leave.type.name }</p>
            <p>Requested by:</p>
            <p>{ `${formatName(leave.requested_by)} - (${leave.requested_by.email})` }</p>
            <p>Duration:</p>
            <p>{ duration(leave.start_time, leave.end_time) }</p>
            <p>Dates:</p>
            <p>{ `${formatDate(leave.start_time)} to ${formatDate(leave.end_time)}` }</p>
            <p>Reason:</p>
            <p>{ leave.reason }</p>
        </div>

        <div class="mt-4" v-if="leave.supervisor_remarks">
            <label for="supervisor-remarks" class="font-semibold">Supervisor remarks <span
                    class="text-gray-600 font-normal">{formatName(ctx.auth.user.supervisor)}</span></label>
            <ul id="supervisor-remarks"
                class="w-full mt-2 border-1 border-gray-100 rounded-md p-2 max-h-100 overflow-y-auto text-orange-500 focus:outline-none">
                {leave.supervisor_remarks && leave.supervisor_remarks.map(r => <li class="bg-slate-50 rounded-sm p-1 my-1">{ r.message } <span
                        class="text-gray-400 text-sm"
                        v-html="`on (${formatDate(r.date, true, true, true)}) by ${formatName(r.user)}`">

                </span></li>) }
            </ul>
        </div>

        { showRemarksField && <div>
            <textarea v-focus v-clear v-model="remark" name="remarks" id="remarks"
                placeholder="Enter remarks for decided action"
                class="w-full border-1 border-gray-200 rounded-md shadow-sm p-2 mt-6 focus:outline-1 focus:outline-blue-600"></textarea>
        </div>}


        <div class="flex gap-4 flex-3 justify-center text-lg mt-6">

            <button 
                class="border-1 border-amber-500 hover:bg-amber-500 hover:text-white rounded-md py-2 px-2.5 text-amber-500 cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-amber-500">
                    Respond
            </button>
            <button
                class="border-1 border-red-500 hover:bg-red-500 hover:text-white rounded-md py-2 px-2.5 text-red-500 cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-red-500">
                    Discard
            </button>
        </div>
        </Modal>
    )
}

export default LeaveRequestDetails