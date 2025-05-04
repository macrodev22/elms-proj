import Card from "../components/Card"
import LeaveRequestItem from "../components/LeaveRequestItem"

const Requests = () => {

    const requests = [
        {
            "id": 3,
            "type": {
                "id": 1,
                "name": "Annual Leave (Holiday Entitlement)",
                "description": "A set amount of time off that employees are legally entitled to for vacations or personal relaxation"
            },
            "status_display": "Pending",
            "requested_at": "2025-05-03T17:32:51.747074Z",
            "start_time": "2025-05-18T00:00:00Z",
            "end_time": "2025-05-22T00:00:00Z",
            "status": "PNDG",
            "reason": "To catch some fresh air",
            "closed": false,
            "company": 2,
            "requested_by": 6
        },
        {
            "id": 4,
            "type": {
                "id": 1,
                "name": "Annual Leave (Holiday Entitlement)",
                "description": "A set amount of time off that employees are legally entitled to for vacations or personal relaxation"
            },
            "status_display": "Declined",
            "requested_at": "2025-05-03T17:33:39.662125Z",
            "start_time": "2025-05-18T00:00:00Z",
            "end_time": "2025-05-22T00:00:00Z",
            "status": "DCLN",
            "reason": "To catch some fresh air",
            "closed": true,
            "company": 2,
            "requested_by": 6
        },
        {
            "id": 5,
            "type": {
                "id": 1,
                "name": "Annual Leave (Holiday Entitlement)",
                "description": "A set amount of time off that employees are legally entitled to for vacations or personal relaxation"
            },
            "status_display": "Approved",
            "requested_at": "2025-05-03T17:35:14.907066Z",
            "start_time": "2025-05-18T00:00:00Z",
            "end_time": "2025-05-22T00:00:00Z",
            "status": "APPR",
            "reason": "To catch some fresh air",
            "closed": true,
            "company": 2,
            "requested_by": 6
        }
    ]

    return (
        <>
        <Card className="relative mt-[-80px] mx-12">
            <h2 className="font-semibold text-2xl mb-4">My requests</h2>
            { requests.map(r => <LeaveRequestItem request={r} />) }
        </Card>
        </>
    )
}

export default Requests