import Card from "./Card"

const LeaveDaysStats = ({approvedCount = 0, approvedDays, pendingCount, pendingDays }) => {

    return (
        <Card>
            <div className="flex gap-8">
                <div className="flex flex-col">
                    <h4 className="font-semibold text-lg">Approved</h4>
                    <p><span className="text-amber-600">{ approvedCount }</span> leaves</p>
                    <p><span className="text-amber-600">{ approvedDays }</span> days</p>
                </div>
                <div className="flex flex-col">
                    <h4 className="font-semibold text-lg">Pending</h4>
                    <p><span className="text-amber-600">{ pendingCount }</span> leaves</p>
                    <p><span className="text-amber-600">{ pendingDays }</span> days</p>
                </div>
            </div>
        </Card>
    )
}

export default LeaveDaysStats