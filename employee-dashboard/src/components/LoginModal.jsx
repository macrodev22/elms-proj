import { useContext, useState } from "react"
import StoreContext from "../store/StoreContext"
import { client } from "../services/client"
import toast from "react-hot-toast"
import Modal from "./Modal"
import InputField from "./InputField"

const LoginModal = ({show, onLoggedIn}) => {

    const ctx = useContext(StoreContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLogin = (e) => {
        e.preventDefault()

        const login = client.post('/auth/login', { email, password })

        toast.promise(login, {
            loading: 'Loggin in...',
            success: (res) => {
                const { token, user } = res.data 
                ctx.setToken(token)
                ctx.setUser(user)
                client.defaults.headers.common['Authorization'] = `Bearer ${token}`
                
                setPassword('')
                onLoggedIn()
                return `Logged in successfully`
            },
            error: e => {
                console.error('login error', e)
                return `Error logging in user!\n${e.response?.data?.detail || e.message}`
            }
        })
    }

    return (
        <Modal show={show} title="Employee Login" dark={true} closable={false}>
            <form action="" method="post" onSubmit={onLogin}>
                <InputField name="email" label="Email" required={true} value={email} onChange={e => setEmail(e.target.value)} />
                <InputField name="password" type="password" label="Password" autoComplete="off" required={true} value={password} onChange={e => setPassword(e.target.value)} />
                <div className="mt-6">
                    <button className="bg-blue-400 rounded-md hover:bg-blue-500 px-6 py-1.5 text-white">Login</button>
                </div>
            </form>
        </Modal>
    )
}

export default LoginModal