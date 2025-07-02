import { useEffect, useState, useContext} from "react"
import Modal from "./Modal"
import DropDown from "./DropDown"
import InputField from "./InputField"
import TextField from "./TextField"
import toast from "react-hot-toast"
import { client } from "../services/client"
import StoreContext from "../store/StoreContext"
import { formatError } from "../utils"



const AddLeaveRequestModal = (props) => {

    const { show, onClose, title } = props

    const ctx = useContext(StoreContext)

    const [options, setOptions] = useState([])
    const [reason, setReason] = useState('')
    const [start_time, setStartTime] = useState('')
    const [end_time, setEndTime] = useState('')
    const [type, setType] = useState('')

    const [startTimeError, setStartTimeError] = useState('')
    const [endTimeError, setEndTimeError] = useState('')

    useEffect(() => {
        client.get('/leave/types')
        .then(({data}) => {
            setOptions(data)
        })
    }, [])

    const addLeave = e => {
        e.preventDefault()
        setStartTimeError('')
        setEndTimeError('')

        const payload = {
            "type": type,
            "start_time": start_time,
            "end_time": end_time,  //"2025-05-22T00:00:00"
            "company": ctx.auth.user.company.id,
            "requested_by": ctx.auth.user.id,
            "reason": reason
        }

        const addRequest = client.post('/employee/leave-requests', payload)
        
        toast.promise(addRequest, {
            loading: 'Making leave request',
            error: e => { 
                const { data } = e.response
                setStartTimeError(data?.start_time?.join('\n') || '')
                setEndTimeError(data?.end_time?.join('\n') || '')
                return `Error making leave request!\n${e.message}`
             },
            success: (res) => {
                // console.log(res)
                ctx.actions.fetchRequests()
                setReason('')
                setStartTime('')
                setEndTime('')
                setType('')
                setStartTimeError('')
                setEndTimeError('')
                return `Leave request added successfully`
            }
        })
    }

    return (
        <Modal show={show} onClose={onClose} title={title} >
            <form method="post" onSubmit={addLeave}>
                <DropDown name="type" options={options.map(o => ({value:o.id, label:o.name}))} value={type} onChange={e => setType(e.target.value)} />
                <InputField name="start_time" label="Start date" type="datetime-local" value={start_time} onChange={e => {setStartTime(e.target.value)}} error={startTimeError} />
                <InputField name="end_time" label="End date" type="datetime-local" value={end_time} onChange={e =>setEndTime(e.target.value)} error={endTimeError} />
                <TextField name="reason" label="Reason" placeholder="Enter a reason..." value={reason} onChange={e => setReason(e.target.value)} />
                <div className="mt-6">
                    <button className="rounded-md bg-blue-400 px-6 py-1.5 text-xl text-white cursor-pointer hover:bg-blue-500">Request for leave</button>
                </div>
            </form>
        </Modal>
    )
}

export default AddLeaveRequestModal