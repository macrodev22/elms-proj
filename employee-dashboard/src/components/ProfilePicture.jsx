import { useContext, useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import StoreContext from "../store/StoreContext"
import { formatName, formatPhoto } from "../utils"
import { client } from "../services/client"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import EmployeeUpdateForm from "./EmployeeUpdateForm"

const ProfileDetails = ({ show, onClose }) => {
    const ctx = useContext(StoreContext)
    const navigate = useNavigate()

    const logout = () => {
        client.post('/auth/logout')
        .then(() => {
            toast.success('Logged out')
            client.defaults.headers.common['Authorization'] = 'Bearer null'
            ctx.setToken(null)
            ctx.setShowLogin(true)
            onClose() 
            navigate('/')
        })
        .catch(e => {
            console.error('logout error', e)
            onClose()
        }).finally(() => {
            window.location.href = "/"
        })
    }

    const editProfile = () => {
        ctx.setShowUpdate(true)
        onClose()
    }

    return (
         show && (<div className="rounded-md bg-gray-50 flex flex-col items-center p-4 absolute z-100 min-w-[100%] w-[max-content] right-[50%] translate-x-[50%] md:right-0 md:translate-x-0 top-[100%]">
            <h4 className="font-semibold text-lg">Profile</h4>
            <div className="mt-4 grid gap-x-2 grid-cols-[1fr_2fr] [&>div:nth-child(odd)]:font-semibold">
                <div>Company:</div>
                <div>{ ctx.auth.user.company.name }</div>
                <div>Role:</div>
                <div>{ ctx.auth.user.role_display }</div>
                <div>Department:</div>
                <div>{ ctx.auth.user.department }</div>
                <div>Contact:</div>
                <div className="grid grid-cols-[1fr_2fr]">
                    <div>Mobile:</div>
                    <div>{ctx.auth.user.contact.mobile}</div>
                    <div>Work:</div>
                    <div>{ ctx.auth.user.contact.work }</div>
                </div>
                <div>Gender:</div>
                <div> { ctx.auth.user.gender_display }</div>
                <div>Designation:</div>
                <div>{ ctx.auth.user.designation }</div>
                <div>Supervisor:</div>
                <div>{ formatName(ctx.auth.user.supervisor) }</div>
            </div>
            <div className="flex justify-between w-full mt-6">
                <button onClick={logout} className="bg-red-400 text-white text-2xl py-1 px-4 rounded-md hover:bg-red-500">Logout</button>
                <button onClick={editProfile} className="rounded-md bg-blue-400 text-2xl text-white px-4 py-1 hover:bg-blue-500">Edit</button>
            </div>
            
        </div>)
    )
}


function ProfilePicture() {

    const ctx = useContext(StoreContext)
    const [showDetails, setShowDetails] = useState(false)
    const {showUpdate, setShowUpdate } = ctx

    return (
        <div className="bg-gray-100 rounded-full relative max-w-[250px] p-[4px] flex gap-2 justify-between items-center my-1">
            <ProfileDetails show={showDetails} onClose={() => setShowDetails(false)} />
            <EmployeeUpdateForm show={showUpdate} onClose={() => setShowUpdate(false)}  />
            <button className="cursor-pointer" onClick={() => setShowDetails(!showDetails)}>
                <ChevronDownIcon className="size-6" />
            </button>
            <div className="flex flex-col flex-1 overflow-hidden">
                <p className="font-bold text-md truncate">{formatName(ctx.auth.user)}</p>
                <p className="font-normal text-sm truncate">{ ctx.auth.user.email}</p>
            </div>
            <div className="h-[55px] w-[55px] rounded-full overflow-hidden">
                <img className="object-cover w-full h-full" src={formatPhoto(ctx.auth.user)} alt="profile picture" />
            </div>
        </div>
    )
}


export default ProfilePicture
