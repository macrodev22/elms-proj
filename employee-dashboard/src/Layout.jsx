import logo from '/favicon.svg'

import { ArrowRightIcon } from '@heroicons/react/24/outline'
import NavButton from './components/NavButton'
import ProfilePicture from './components/ProfilePicture'

import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <>
    <div className="bg-blue-100 px-12 flex justify-between items-center">
      <div className="flex justify-between items-centre">
        <img src={logo} alt="logo" className='h-12 my-2' />
      </div>
      <div className="flex gap-6 5 self-stretch py-2">
        <NavButton label="Dashboard" to="/" />
        <NavButton label="Stats" to="/stats" />
        <NavButton label="My Requests" to="/requests" />
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
          <span>Good morning, Mary ☕</span>
          <button className="bg-blue-500 text-white flex gap-2 items-center px-3 py-2 font-normal text-xl rounded-md cursor-pointer hover:bg-blue-600"><ArrowRightIcon className='size-6' /> Request leave</button>
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