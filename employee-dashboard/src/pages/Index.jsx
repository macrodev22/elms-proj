import { MegaphoneIcon } from "@heroicons/react/24/outline"
import { useContext, useEffect } from "react"
import StoreContext from "../store/StoreContext"
import Card from "../components/Card"
import LeavePattern from "../components/LeavePattern"
import PieProgress from "../components/PieProgress"
import DaysPending from "../components/DaysPending"
import PublicHoliday from "../components/PublicHoliday"
import LeaveStat from "../components/LeaveStat"
import Announcement from "../components/Announcement"
import EmployeeCard from "../components/EmployeeCard"

const publicHolidays = [
    { name: 'Holy Thursday', date: '2025-04-17', remarks: 'Optional Holiday' },
    { name: 'Good Friday', date: '2025-04-18', remarks: 'Public Holiday' },
    { name: 'Easter Sunday', date: '2025-04-20', remarks: 'Public Holiday' },
    { name: 'Easter Monday', date: '2025-04-21', remarks: 'Public Holiday' },
    { name: 'Labour Day', date: '2025-05-01', remarks: 'Public Holiday' },

]

const announcements = [
    {
        text: "Annual leave requests must be submitted at least 2 weeks in advance.",
        author: "HR Department",
        date: "2025-06-01"
    },
    {
        text: "Employees are entitled to 21 working days of paid annual leave per year.",
        author: "Leave Policy v2.1",
        date: "2025-06-02"
    },
    {
        text: "Carry-over of unused leave is limited to 10 days into the next calendar year.",
        author: "HR Department",
        date: "2025-06-03"
    },
    {
        text: "Public holidays falling during your leave period will not be counted as leave days.",
        author: "Leave Policy v2.1",
        date: "2025-06-04"
    },
    {
        text: "Sick leave must be supported by a medical certificate after 2 consecutive days.",
        author: "Medical HR Guidelines",
        date: "2025-06-05"
    },
    {
        text: "Maternity leave entitlement is 90 calendar days with full pay.",
        author: "HR Department",
        date: "2025-06-06"
    },
    {
        text: "Paternity leave is granted for 4 working days within two weeks of delivery.",
        author: "HR Department",
        date: "2025-06-07"
    },
    {
        text: "Compassionate leave may be granted upon approval by your supervisor.",
        author: "Leave Policy v2.1",
        date: "2025-06-08"
    }
]

// const data = {
//     "total_leave_days": 21,
//     "days_used": 2,
//     "days_pending_approval": 19
// }

// const data = {
//     "total_leave_days": 21,
//     "days_used": 2,
//     "days_pending_approval": 19
// }

const Index = () => {
    const ctx = useContext(StoreContext)
    const { total_leave_days, days_used, days_pending_approval } = ctx.stats

    useEffect(() => {
        ctx.actions.fetchStats()
        ctx.actions.fetchEmployeesOnLeave()
    }, [])

    return (
        <>
            <div className="relative mt-[-40px] md:mt-[-80px] flex flex-col md:grid md:grid-cols-[1fr_2fr] gap-6">
                <div className="flex flex-col gap-6">
                    <Card isDark={true} className="basis-[220px]" >
                        <h4 className="text-2xl flex justify-between mb-4"><span>Retrospective</span><span className="bg-blue-400 rounded-md uppercase text-lg font-light px-3 py-1">{total_leave_days - days_used} Days</span></h4>
                        <div className="flex justify-between">
                            <PieProgress used={days_used} total={total_leave_days} />
                            <DaysPending days={days_pending_approval} />
                        </div>
                    </Card>
                    <Card>
                        <h4 className="text-2xl mb-4">Public holidays</h4>
                        { publicHolidays.map(h => <PublicHoliday name={h.name} date={h.date} remarks={h.remarks} key={h.name} />) }
                    </Card>
                </div>
                <div className='flex flex-col lg:grid lg:grid-cols-2 gap-6'>
                    <LeavePattern className="col-span-2" />
                    <Card className="max-h-90 overflow-y-auto">
                        <h4 className='text-2xl flex items-center gap-1.5 mb-4'>
                            <MegaphoneIcon className="size-6" />
                            <span>Leave Policies</span>
                        </h4>
                        { announcements.map(a => <Announcement text={a.text} author={a.author} date={a.date} key={a.date+a.author} />) }
                    </Card>
                    <Card>
                        <h4 className='text-2xl mb-4'>On leave</h4>
                        <div className="flex justify-center items-center">
                        {ctx.employeesOnLeave.length > 0 ? ctx.employeesOnLeave.map(l => <EmployeeCard key={l.id} user={l.requested_by} leaveType={l.type.name} />) : <p className="text-gray-500">No employees are on leave today</p> }
                
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Index