import { MegaphoneIcon } from "@heroicons/react/24/outline"
import Card from "../components/Card"
import LeavePattern from "../components/LeavePattern"
import PieProgress from "../components/PieProgress"
import DaysPending from "../components/DaysPending"
import PublicHoliday from "../components/PublicHoliday"
import LeaveStat from "../components/LeaveStat"
import Announcement from "../components/Announcement"

const publicHolidays = [
    { name: 'Holy Thursday', date: '2025-04-17', remarks: 'Optional Holiday' },
    { name: 'Good Friday', date: '2025-04-18', remarks: 'Public Holiday' },
    { name: 'Easter Sunday', date: '2025-04-20', remarks: 'Public Holiday' },
    { name: 'Easter Monday', date: '2025-04-21', remarks: 'Public Holiday' },
    { name: 'Labour Day', date: '2025-05-01', remarks: 'Public Holiday' },

]

const announcements = [
    { text: "Dear team, it's time to plan your festive holidays!", author: 'Mugisha Musimenta', date: '2025-05-15' },
    { text: "Dear team, it's time to plan your festive holidays!", author: 'Mugisha Musimenta', date: '2025-05-16' },
    { text: "Dear team, it's time to plan your festive holidays!", author: 'Mugisha Musimenta', date: '2025-05-17' },
    { text: "Dear team, it's time to plan your festive holidays!", author: 'Mugisha Musimenta', date: '2025-05-18' },
]

// const data = {
//     "total_leave_days": 21,
//     "days_used": 2,
//     "days_pending_approval": 19
// }

const Index = () => {
    return (
        <>
            <div className="relative mt-[-80px] px-12 grid grid-cols-[1fr_2fr] gap-6">
                <div className="flex flex-col gap-6">
                    <Card isDark={true} className="basis-[220px]" >
                        <h4 className="text-2xl flex justify-between mb-4"><span>Retrospective</span><span className="bg-blue-400 rounded-md uppercase text-lg font-light px-3 py-1">19 Days</span></h4>
                        <div className="flex justify-between">
                            <PieProgress used={7} />
                            <DaysPending days={6} />
                        </div>
                    </Card>
                    <Card>
                        <h4 className="text-2xl mb-4">Public holidays</h4>
                        { publicHolidays.map(h => <PublicHoliday name={h.name} date={h.date} remarks={h.remarks} key={h.name} />) }
                    </Card>
                </div>
                <div className='grid grid-cols-2 gap-6'>
                    <LeavePattern className="col-span-2" />
                    <Card>
                        <h4 className='text-2xl flex items-center gap-1.5 mb-4'>
                            <MegaphoneIcon className="size-6" />
                            <span>Leave Policies</span>
                        </h4>
                        { announcements.map(a => <Announcement text={a.text} author={a.author} date={a.date} key={a.date+a.author} />) }
                    </Card>
                    <Card>
                        <h4 className='text-2xl mb-4'>On leave</h4>
                        <LeaveStat used={3} />
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Index