import { useEffect, useState, useContext} from "react"
import Modal from "./Modal"
import DropDown from "./DropDown"
import InputField from "./InputField"
import TextField from "./TextField"
import toast from "react-hot-toast"
import { client } from "../services/client"
import StoreContext from "../store/StoreContext"



const AddLeaveRequestModal = (props) => {

    const { show, onClose, title } = props

    const ctx = useContext(StoreContext)

    const [options, setOptions] = useState([])
    const [reason, setReason] = useState('')
    const [start_time, setStartTime] = useState('')
    const [end_time, setEndTime] = useState('')
    const [type, setType] = useState('')

    useEffect(() => {
        client.get('/leave/types')
        .then(({data}) => {
            setOptions(data)
        })
    }, [])

    const addLeave = e => {
        e.preventDefault()
        const payload = {
            "type": type,
            "start_time": start_time,
            "end_time": end_time,  //"2025-05-22T00:00:00"
            "company": ctx.auth.user.company.id,
            "requested_by": ctx.auth.user.id,
            "reason": reason
        }

        const addRequest = client.post('/employee/leave-requests', payload)
        .then(res => {
            console.log(res)
            ctx.actions.fetchRequests()
            setReason('')
            setStartTime('')
            setEndTime('')
            setType('')
        })
        
        toast.promise(addRequest, {
            loading: 'Making leave request',
            error: e => { 
                return `Error making leave request!\n${e.message}`
             },
            success: 'Leave request added successfully'
        })
    }

    return (
        <Modal show={show} onClose={onClose} title={title} >
            <form method="post" onSubmit={addLeave}>
                <DropDown name="type" options={options.map(o => ({value:o.id, label:o.name}))} value={type} onChange={e => setType(e.target.value)} />
                <InputField name="start_time" label="Start date" type="datetime-local" value={start_time} onChange={e => {setStartTime(e.target.value)}} />
                <InputField name="end_time" label="End date" type="datetime-local" value={end_time} onChange={e =>setEndTime(e.target.value)} />
                <TextField name="reason" label="Reason" placeholder="Enter a reason..." value={reason} onChange={e => setReason(e.target.value)} />
                <div className="mt-6">
                    <button className="rounded-md bg-blue-400 px-6 py-1.5 text-xl text-white cursor-pointer hover:bg-blue-500">Request for leave</button>
                </div>
            </form>
        </Modal>
    )
}

export default AddLeaveRequestModal