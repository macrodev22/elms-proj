// import { useState } from "react"
import Modal from "./Modal"
import InputField from "./InputField"
import DropDown from "./DropDown"
import { ArrowPathIcon } from "@heroicons/react/24/outline"

const EmployeeUpdateForm = ({ show, onClose }) => {

    return (
        <Modal title="Update employee details" show={show} onClose={onClose} >
            <form method="post" encType="multipart/form-data">
            <InputField name="first_name" label="First name"  />
            <InputField name="middle_name" label="Middle name" required={false} />
            <InputField name="last_name" label="Last name"  />
            <InputField name="designation" label="Designation" required={false} />
            <div className="flex gap-2">
                <InputField name="work-contact" label="Work Contact" required={false}
                     />
                <InputField name="mobile-contact" label="Mobile Contact" required={false}
                    />
            </div>
            <div className="flex gap-8 items-center mb-4">
                <div className="flex flex-col">
                    <label htmlFor="date_of_birth" className="mb-1.5">Date of Birth</label>
                    <input type="date" placeholder="Date of Birth"
                        name="date_of_birth" id="date_of_birth" className="border-2 border-gray-100 rounded-sm px-4 py-1.5" />
                </div>
                <div className="flex gap-4">
                    <div className="rounded-full w-26 h-26 overflow-hidden border-gray-200 border-1">
                        <img src="initialDisplayedProfileImage" alt="profile photo"
                            className="w-full h-full object-cover" />
                    </div>
                    <label htmlFor="profile_picture" className="mb-1.5 grid place-items-center">
                        <span
                            className="rounded-lg cursor-pointer border-1 border-green-500 py-2 px-5 hover:bg-green-500 hover:text-white">
                            Choose Profile Photo
                        </span>
                    </label>
                    <input type="file" accept="image/*" id="profile_picture"
                        name="profile_picture" className="hidden" />
                    <button>
                        <ArrowPathIcon
                            className="size-12 cursor-pointer hover:bg-green-500 hover:stroke-white rounded-full p-2"
                             />
                    </button>

                </div>
            </div>

            <div className="flex gap-4">
                <DropDown name="department" label="Department"
                     />
                <DropDown label="Role" name="role"  />
                <DropDown label="Gender" name="gender"  />
            </div>
            <div className="flex mb-6 mt-2">
                <button>Update</button>
            </div>
        </form>
        </Modal>
    )
}

export default EmployeeUpdateForm