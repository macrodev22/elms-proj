import { useState, useEffect, useContext } from 'react'
import { Outlet } from 'react-router-dom'

import logo from '/favicon.svg'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import NavButton from './components/NavButton'
import ProfilePicture from './components/ProfilePicture'
import AddLeaveRequestModal from './components/AddLeaveRequestModal'
import {Toaster} from 'react-hot-toast'
import { client } from './services/client'
import { greeting } from './utils'
import StoreContext from './store/StoreContext'
import LoginModal from './components/LoginModal'


export default function Layout() {

  const ctx = useContext(StoreContext)

  const [showAddLeave, setShowAddLeave] = useState(false)
  const { showLogin, setShowLogin } = ctx
  
  const addLeaveRequest = () => {
    setShowAddLeave(true)
  }

  const onCloseModal = () => {
    setShowAddLeave(false)
  }

  useEffect(() => {
    client.get('/auth/user')
    .then(({data}) => {
      const { user, token } = data
      ctx.setUser(user)
      ctx.setToken(token)
      client.defaults.headers.common['Authorization'] = `Bearer ${token}`
      ctx.actions.fetchRequests()
      setShowLogin(false)
    }).catch(e => {
      setShowLogin(true)
      console.error('error authenticating user',e)
    })
    

  }, [])

  const getBadge = (queries) => {
    if (!queries?.length) return null 
    return queries.reduce((p,c) =>{ 
      if (!c.supervisor_remarks) {
        p.count += 1
        return p
      }
      else return p
    } , { count: 0 })
  }
  
    return (
        <>
        <Toaster position='top-center' />
        <AddLeaveRequestModal show={showAddLeave}  onClose={onCloseModal} title="Add leave request" />
        <LoginModal show={showLogin} onLoggedIn={() => setShowLogin(false)} />
      <div className="bg-blue-100 px-12 flex justify-between items-center">
        <div className="flex justify-between items-centre">
          <img src={logo} alt="logo" className='h-12 my-2' />
        </div>
        <div className="flex gap-6 5 self-stretch py-2">
          <NavButton label="Dashboard" to="/" />
          <NavButton label="Stats" to="/stats" />
          <NavButton label="My Requests" to="/requests" badge={getBadge(ctx.queries)} />
          <NavButton label="Report" to="/reports" />
        </div>
        <div>
          <ProfilePicture />
        </div>
      </div>

      {/* second dash area  */}
      <div className="bg-blue-200 h-[190px]">
        <div className="py-4 px-12 flex justify-between">
          <h4 className="text-4xl font-semibold flex justify-between w-full mt-4">
            <span>{ greeting()[0] }{`, ${ctx.auth.user.first_name || ''}`} { greeting()[1] }</span>
            <button onClick={addLeaveRequest} className="bg-blue-500 text-white flex gap-2 items-center px-3 py-2 font-normal text-xl rounded-md cursor-pointer hover:bg-blue-600"><ArrowRightIcon className='size-6' /> Request leave</button>
          </h4>
        </div>
      </div>

      {/* main  */}
      <main>
        <Outlet />
      </main>
    </>
    )
}