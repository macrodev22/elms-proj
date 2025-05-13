import { useEffect, useContext } from "react"
import Card from "../components/Card"
import LeaveRequestItem from "../components/LeaveRequestItem"
import { client } from "../services/client"
import toast from "react-hot-toast"
import StoreContext from "../store/StoreContext"

const Requests = () => {

    const ctx = useContext(StoreContext)

    useEffect(() => {
        client.get('/employee/leave-requests')
        .then(({data}) => {
            const {requests} = data
            ctx.setRequests(requests)
        })
        .catch(e => {
            toast.error(`Error getting requests!\n${e.message}`)
        })
        
    }, [])

    const {requests} = ctx 

    return (
        <>
        <Card className="relative mt-[-80px] mx-12">
            <h2 className="font-semibold text-2xl mb-4">My requests</h2>
            { requests.map(r => <LeaveRequestItem request={r} key={r.id} />) }
        </Card>
        </>
    )
}

export default Requests