import { useState, useContext, useEffect, useRef } from "react"
import StoreContext from '../store/StoreContext'
import Modal from "./Modal"
import InputField from "./InputField"
import DropDown from "./DropDown"
import { ArrowPathIcon } from "@heroicons/react/24/outline"
import { client } from "../services/client"
import toast from "react-hot-toast"

const EmployeeUpdateForm = ({ show, onClose }) => {

    const ctx = useContext(StoreContext)
    const { first_name, middle_name, last_name, contact, designation, date_of_birth, role_display, department, gender,profile_picture_url, } = ctx.auth.user

    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [newDesignation, setNewDesignation] = useState('')
    const [newContact, setNewContact] = useState({mobile:'', work:''})
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [newGender, setNewGender] = useState('')

    const profileDisplay = useRef()
    const photoInput = useRef()
    const formRef = useRef()
    const passwordFormRef = useRef()

    const [showUpdatePassword, setShowUpdatePassword] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [oldPasswordError, setOldPasswordError] = useState('')
    const [passwordConfirmError, setPasswordConfirmError] = useState('')

    useEffect(() => {
        if(ctx.auth.user) {
            setFirstName(first_name)
            setMiddleName(middle_name)
            setLastName(last_name)
            setNewDesignation(designation)
            setDateOfBirth(date_of_birth)
            setNewGender(gender)
        }
        if(ctx.auth.user.contact) {
            setNewContact(contact)
        }
        
    }, [ctx.auth.user])

    useEffect(() => {
        if(showUpdatePassword && passwordFormRef.current) {
            passwordFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [showUpdatePassword])

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
        profileDisplay.current.src= profile_picture_url
    }

    const onUpdatePassword = (e) => {
        e.preventDefault()
        const update = client.post('/auth/change-password', {
            "old_password": oldPassword,
            "new_password": password,
            "new_password_confirm": passwordConfirm
        })
        toast.promise(
            update,
            {
                loading: 'Updating password',
                success: () => {
                    setOldPasswordError('')
                    setPasswordError('')
                    setPasswordConfirmError('')
                    setPassword('')
                    setOldPassword('')
                    setPasswordConfirm('')
                    setShowUpdatePassword(false)
                    return 'Password changed successfully'
                },
                error: err => {
                    const {data} = err.response 
                    if(data) {
                        setOldPasswordError(data.old_password)
                        setPasswordError(data.new_password)
                        setPasswordConfirmError(data.new_password_confirm)
                        return 'Error chaning password!\nSelect the error highlighted below'
                    } else return `Error chaning password: ${err.message}`
                }
            }
        )
    }

    const onSubmit = e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('first_name', firstName)
        formData.append('middle_name', middleName)
        formData.append('last_name', lastName)
        formData.append('designation', newDesignation)
        formData.append('contact', JSON.stringify(newContact))
        formData.append('date_of_birth', dateOfBirth)
        formData.append('gender', newGender)
        const pic = photoInput.current.files[0]
        if(pic) formData.append('profile_picture', photoInput.current.files[0])
        // console.log('logging', Object.fromEntries(formData.entries()))
        
        const update = client.patchForm("/auth/profile", formData)
        toast.promise(
            update,
            {
                loading: 'Updating employee data',
                success: (res) => {
                    const user = res.data
                    console.log('updated user', user)
                    ctx.setUser(user)
                    return 'Employee details updated successfully'
                },
                error: err => `Error updating employee ${err.toString()}`
            }
        )
    }

    return (
        <Modal title="Update employee details" show={show} onClose={onClose} ref={formRef} >
            <form method="post" encType="multipart/form-data" onSubmit={onSubmit}>
            <InputField name="first_name" label="First name" value={firstName} onChange={e => setFirstName(e.target.value)} autoComplete="off" />
            <InputField name="middle_name" label="Middle name" required={false} value={middleName} onChange={e => setMiddleName(e.target.value)} autoComplete="off" />
            <InputField name="last_name" label="Last name" value={lastName} onChange={e => setLastName(e.target.value)} autoComplete="off"  />
            <InputField name="designation" label="Designation" required={false} value={newDesignation} onChange={e => setNewDesignation(e.target.value)} autoComplete="off" />
            <div className="flex gap-2">
                <InputField name="work-contact" label="Work Contact" required={false} autoComplete="off" value={newContact.work} onChange={e => setNewContact({...newContact, work: e.target.value})}
                     />
                <InputField name="mobile-contact" label="Mobile Contact" required={false} autoComplete="off" value={newContact.mobile} onChange={e => setNewContact({...newContact, mobile: e.target.value})}
                    />
            </div>
            <div className="flex gap-8 items-center mb-4">
                <div className="flex flex-col">
                    <label htmlFor="date_of_birth" className="mb-1.5">Date of Birth</label>
                    <input type="date" placeholder="Date of Birth" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)}
                        name="date_of_birth" id="date_of_birth" className="border-2 border-gray-100 rounded-sm px-4 py-1.5" />
                </div>
                <div className="flex gap-4">
                    <div className="rounded-full w-26 h-26 overflow-hidden border-gray-200 border-1">
                        <img src={profile_picture_url} alt="profile photo" ref={profileDisplay}
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
                <InputField name="department" label="Department" value={department?.name} disabled={true}
                     />
                <InputField label="Role" name="role" disabled={true} value={role_display}  />
                <DropDown disabled label="Gender" name="gender" options={[{value:'M', label:'Male'}, {value:'F', label: 'Female'}]} value={newGender} onChange={e => setNewGender(e.target.value)} />
            </div>
            <div className="flex mb-6 mt-6">
                <button className="rounded-md bg-blue-400 px-6 py-2 text-lg hover:bg-blue-500 text-white">Update</button>
            </div>
        </form>
        <button onClick={() => setShowUpdatePassword(!showUpdatePassword)} className="rounded-md bg-green-400 text-white px-6 py-2 text-lg hover:bg-green-500">Update password</button>
        { showUpdatePassword && <form className="mt-4" ref={passwordFormRef} onSubmit={onUpdatePassword}>
            <InputField type="password" name='old_password' label='Old Password' value={oldPassword} onChange={ e => setOldPassword(e.target.value) } error={oldPasswordError} />
            <InputField type="password" name='new_password' label='New password' value={password} onChange={e => setPassword(e.target.value)} error={passwordError} />
            <InputField type="password" name='new_password_confirm' label='Confirm new password' value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} error={passwordConfirmError} />
            <button className="mt-4 bg-blue-400 text-white text-lg hover:bg-blue-500 py-2 px-6 rounded-md">Save new password</button>
        </form>}
        </Modal>
    )
}

export default EmployeeUpdateForm
