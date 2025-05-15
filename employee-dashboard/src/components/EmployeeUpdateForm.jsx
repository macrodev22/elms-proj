import { useState, useContext, useEffect, useRef } from "react"
import StoreContext from '../store/StoreContext'
import Modal from "./Modal"
import InputField from "./InputField"
import DropDown from "./DropDown"
import { ArrowPathIcon } from "@heroicons/react/24/outline"

const EmployeeUpdateForm = ({ show, onClose }) => {

    const ctx = useContext(StoreContext)
    const { first_name, middle_name, last_name, contact, designation, date_of_birth, role_display, department } = ctx.auth.user

    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [newDesignation, setNewDesignation] = useState('')
    const [newContact, setNewContact] = useState({mobile:'', work:''})
    const [dateOfBirth, setDateOfBirth] = useState('')

    const profileDisplay = useRef()
    const photoInput = useRef()

    useEffect(() => {
        if(ctx.auth.user) {
            setFirstName(first_name)
            setMiddleName(middle_name)
            setLastName(last_name)
            setNewDesignation(designation)
            setDateOfBirth(date_of_birth)
        }
        if(ctx.auth.user.contact) {
            setNewContact(contact)
        }
    }, [ctx.auth.user])

    const onChangeImage = (e) => {
        const file = e.target.files[0]

        const fr = new FileReader()
        fr.addEventListener('load', () => {
            profileDisplay.current.src = fr.result
        })

        fr.readAsDataURL(file)
    }

    const onResetImage = (e) => {
     e.preventDefault()
        photoInput.current.value = ''
        photoInput.current.dispatchEvent(new Event('change'))
    }

    const onSubmit = e => {
        e.preventDefault()
    }

    return (
        <Modal title="Update employee details" show={show} onClose={onClose} >
            <form method="post" encType="multipart/form-data" onSubmit={onSubmit}>
            <InputField name="first_name" label="First name" value={firstName} onChange={e => setFirstName(e.target.value)} />
            <InputField name="middle_name" label="Middle name" required={false} value={middleName} onChange={e => setMiddleName(e.target.value)} />
            <InputField name="last_name" label="Last name" value={lastName}   />
            <InputField name="designation" label="Designation" required={false} value={newDesignation} />
            <div className="flex gap-2">
                <InputField name="work-contact" label="Work Contact" required={false} value={newContact.work}
                     />
                <InputField name="mobile-contact" label="Mobile Contact" required={false} value={newContact.mobile}
                    />
            </div>
            <div className="flex gap-8 items-center mb-4">
                <div className="flex flex-col">
                    <label htmlFor="date_of_birth" className="mb-1.5">Date of Birth</label>
                    <input type="date" placeholder="Date of Birth" value={dateOfBirth}
                        name="date_of_birth" id="date_of_birth" className="border-2 border-gray-100 rounded-sm px-4 py-1.5" />
                </div>
                <div className="flex gap-4">
                    <div className="rounded-full w-26 h-26 overflow-hidden border-gray-200 border-1">
                        <img src="initialDisplayedProfileImage" alt="profile photo" ref={profileDisplay}
                            className="w-full h-full object-cover" />
                    </div>
                    <label htmlFor="profile_picture" className="mb-1.5 grid place-items-center">
                        <span
                            className="rounded-lg cursor-pointer border-1 border-green-500 py-2 px-5 hover:bg-green-500 hover:text-white">
                            Choose Profile Photo
                        </span>
                    </label>
                    <input type="file" accept="image/*" id="profile_picture" ref={photoInput}
                        name="profile_picture" className="hidden" onChange={onChangeImage} />
                    <button onClick={onResetImage}>
                        <ArrowPathIcon
                            className="size-12 cursor-pointer hover:bg-green-500 hover:stroke-white rounded-full p-2"
                             />
                    </button>

                </div>
            </div>

            <div className="flex gap-4">
                <InputField name="department" label="Department" value={department} disabled={true}
                     />
                <InputField label="Role" name="role" disabled={true} value={role_display}  />
                <DropDown label="Gender" name="gender" options={[{value:'M', label:'Male'}, {value:'F', label: 'Female'}]}  />
            </div>
            <div className="flex mb-6 mt-6">
                <button className="rounded-md bg-blue-400 px-6 py-2 text-lg hover:bg-blue-500 text-white">Update</button>
            </div>
        </form>
        </Modal>
    )
}

export default EmployeeUpdateForm