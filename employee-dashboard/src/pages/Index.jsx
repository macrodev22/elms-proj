import Card from "../components/Card"
import LeavePattern from "../components/LeavePattern"

const Index = () => {
    return (
        <>
            <div className="relative mt-[-80px] px-12 grid grid-cols-[1fr_2fr] gap-6">
                <div className="flex flex-col gap-6">
                    <Card isDark={true} className="basis-[220px]" >
                    <h4 className="text-2xl">Retrospective</h4>
                    </Card>
                    <Card>
                    <h4 className="text-2xl">Public holidays</h4>
                    </Card>
                </div>
                <div className='grid grid-cols-2 gap-6'>
                    <LeavePattern className="col-span-2" />
                    <Card>
                    <h4 className='text-2xl'>Requests</h4>
                    </Card>
                    <Card>
                    <h4 className='text-2xl'>Leave stats</h4>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Index