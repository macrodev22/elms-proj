import { useContext } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import StoreContext from "../store/StoreContext"
import { formatName, formatPhoto } from "../utils"

function ProfilePicture() {

    const ctx = useContext(StoreContext)

    return (
        <div className="bg-gray-100 rounded-full max-w-[250px] p-[4px] flex gap-2 justify-between items-center my-1">
            <button className="cursor-pointer">
                <ChevronDownIcon className="size-6" />
            </button>
            <div className="flex flex-col">
                <p className="font-bold text-md truncate">{formatName(ctx.auth.user)}</p>
                <p className="font-normal text-sm">{ ctx.auth.user.email}</p>
            </div>
            <div className="h-[55px] w-[55px] rounded-full overflow-hidden">
                <img className="object-cover w-full h-full" src={formatPhoto(ctx.auth.user)} alt="profile picture" />
            </div>
        </div>
    )
}


export default ProfilePicture
