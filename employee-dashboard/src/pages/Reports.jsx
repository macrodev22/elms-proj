import Card from "../components/Card"

const Reports = () => {
    return (
        <Card className="mt-[-80px]">
            <h2 className='text-2xl font-semibold mb-4'>Reports</h2>
            <button className="cursor-pointer rounded-md px-5 py-2.5 bg-blue-400 text-white hover:bg-blue-500">Download Personal Leave Report</button>
            <div className="mt-10 grid grid-cols-5 w-full">
                <div className="font-bold">From</div>
                <div className="font-bold">To</div>
                <div className="font-bold">Duration</div>
                <div className="font-bold">Type</div>
                <div className="font-bold">Status</div>

                <div>1st Jan 2025</div>
                <div>4th Jan 2025</div>
                <div>4 days</div>
                <div>Maternity Leave</div>
                <div>Completed</div>
            </div>
        </Card>
    )
}

export default Reports