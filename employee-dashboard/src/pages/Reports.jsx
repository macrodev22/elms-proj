import { useEffect, useState } from "react"
import Card from "../components/Card"
import { client } from "../services/client"
import toast from "react-hot-toast"
import { duration, formatDate } from "../utils"

const ReportItem = ({ start_date, end_date, duration, type, status }) => {
    return (
        <>
        <div>{ start_date }</div>
        <div>{ end_date }</div>
        <div>{ duration }</div>
        <div>{ type }</div>
        <div className={`${status == '(Cancelled)' ? 'text-red-500' : ''}`}>{ status }</div>
        </>
    )
}

const downloadReport = (leaveRequests, name='Employee') => {
    const worker = new Worker(new URL('../assets/worker.js', import.meta.url), { type: "classic" })

    worker.onmessage = e => {
        console.log('Worker has responded', e)
        const blob = e.data
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url 
        a.download = `Report for ${name}`
        a.click()
        URL.revokeObjectURL(url)
    }

    const aoa = [["From", "To", "Duration(Days)", "Leave Type", "Status"]]
    const leaveRows = leaveRequests.filter(lr => !lr.closed).map(lr => ([new Date(lr.start_time), new Date(lr.end_time), lr.duration, lr.type.name, lr.status_display]))
    aoa.push(...leaveRows)
    worker.postMessage(aoa)
}

const Reports = () => {
    const [leaveRequests, setLeaveRequests] = useState([])

    useEffect(() => {
        client.get('/employee/leave-requests').then(({data}) => {
            setLeaveRequests(data.requests)
        }).catch(e => toast.error(`Error getting leave requests: ${e.message}`))
    }, [])

    return (
        <Card className="mt-[-80px]">
            <h2 className='text-2xl font-semibold mb-4'>Reports</h2>
            <button onClick={() => downloadReport(leaveRequests)} className="cursor-pointer rounded-md px-5 py-2.5 bg-blue-400 text-white hover:bg-blue-500">Download Personal Leave Report</button>
            <div className="mt-10 grid grid-cols-5 w-full text-xs md:text-sm">
                <div className="font-bold">From</div>
                <div className="font-bold">To</div>
                <div className="font-bold">Duration</div>
                <div className="font-bold">Type</div>
                <div className="font-bold">Status</div>

                {/* <div>1st Jan 2025</div>
                <div>4th Jan 2025</div>
                <div>4 days</div>
                <div>Maternity Leave</div>
                <div>Completed</div> */}
                {leaveRequests.map(l => <ReportItem start_date={formatDate(l.start_time, true)}  end_date={formatDate(l.end_time, true)} key={l.id} duration={duration(l)} status={`${l.closed ? '(Cancelled)' : l.status_display}`} type={l.type?.name} />)}
            </div>
        </Card>
    )
}

export default Reports