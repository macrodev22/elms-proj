import Card from '../components/Card'
import LeaveDaysOverview from '../components/LeaveDaysOverview'
import LeaveDaysStats from '../components/LeaveDaysStats'
import LeaveTypeStat from '../components/LeaveTypeStat'
import { useContext, useEffect, useState } from 'react'
import StoreContext from '../store/StoreContext'
import { client } from '../services/client'
import toast from 'react-hot-toast'
import { getLeaveColors } from '../utils'

const Stats = () => {

    const ctx = useContext(StoreContext)
    const { total_leave_days, days_used } = ctx.stats
    const [approvedCount, setApprovedCount] = useState(0)
    const [approvedDays, setApprovedDays] = useState(0)
    const [pendingCount, setPendingCount] = useState(0)
    const [pendingDays, setPendingDays] = useState(0)
    const [leaveTypesStats, setLeaveTypesStats] = useState([{
            "id": 15,
            "name": "Time Off In Lieu (TOIL)",
            "description": "Paid time off in exchange for overtime worked",
            "days_used": 0
        }])
   

    useEffect(() => {
        client.get('/employee/reports/summary')
        .then(({data}) => {
            console.log(data)
            setApprovedCount(data.approved_leave.length)
            setApprovedDays(data.approved_leave.reduce((p,c) => p+c.duration, 0))
            setPendingCount(data.pending_leave.length)
            setPendingDays(data.pending_leave.reduce((p,c) => p+c.duration, 0))
            setLeaveTypesStats(data.types.sort((a,b) => b.duration - a.duration))
        })
        .catch(e => {
            console.error(e)
            toast.error(`Error getting stats: ${e.toString()}`)
        })
    }, [])

    return (
        <Card className="relative mt-[-40px] md:mt-[-80px] p-4">
            <h2 className='text-2xl font-semibold mb-4'>Stats</h2>
            <div className="flex flex-col sm:flex-row gap-8 mb-8">
                <LeaveDaysStats approvedDays={approvedDays} approvedCount={approvedCount} pendingCount={pendingCount} pendingDays={pendingDays} />
                <LeaveDaysOverview total={total_leave_days} remaining={total_leave_days - days_used} used={days_used} />
            </div>
            <div className="flex gap-4 w-full overflow-x-scroll ">
                {leaveTypesStats && leaveTypesStats.sort((a,b) => b.days_used - a.days_used).map(t => <LeaveTypeStat used={t.days_used} strokeColor={getLeaveColors(t.name).highlightColor} key={t.id} type={t.name} />)}
                
            </div>
        </Card>
    )
}

export default Stats