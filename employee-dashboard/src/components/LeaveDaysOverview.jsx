import Card from "./Card"

const LeaveDaysOverview = ({ remaining, used, total }) => {

    return (
        <Card>
            <div className="flex gap-4">
                <div className="flex flex-col">
                    <h4 className="font-semibold text-lg">Remaining</h4>
                    <p><span className="text-amber-600">{ remaining }</span> days</p>
                </div>
                <div className="flex flex-col">
                    <h4 className="font-semibold text-lg">Used</h4>
                    <p><span className="text-amber-600">{ used }</span> days</p>

                </div>
                <div className="flex flex-col">
                    <h4 className="font-semibold text-lg">Total</h4>
                    <p><span className="text-amber-600">{ total }</span> days</p>

                </div>
            </div>
        </Card>
    )
}

export default LeaveDaysOverview