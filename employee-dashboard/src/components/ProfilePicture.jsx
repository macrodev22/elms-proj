import { ChevronDownIcon } from "@heroicons/react/24/outline"

function ProfilePicture() {

    return (
        <div className="bg-gray-100 rounded-full w-[210px] p-[4px] flex gap-2 justify-between items-center my-1">
            <button className="cursor-pointer">
                <ChevronDownIcon className="size-6" />
            </button>
            <div className="flex flex-col">
                <p className="font-bold text-md">Mary Jane</p>
                <p className="font-normal text-sm">mary@gmail.com</p>
            </div>
            <div className="h-[55px] w-[55px] rounded-full overflow-hidden">
                <img className="object-cover w-full h-full" src="https://media.istockphoto.com/id/1587604256/photo/portrait-lawyer-and-black-woman-with-tablet-smile-and-happy-in-office-workplace-african.jpg?s=612x612&w=0&k=20&c=n9yulMNKdIYIQC-Qns8agFj6GBDbiKyPRruaUTh4MKs=" alt="profile picture" />
            </div>
        </div>
    )
}


export default ProfilePicture
