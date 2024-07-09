import React from 'react'
import { NavLink } from 'react-router-dom'
import { Separator } from '../ui/separator'


const SideBar = () => {

  return (
    <nav className="h-full w-1/6 pt-6 pl-4">
      <div className="w-5/6">
        <ul className="flex flex-col gap-4 pb-4">
            <NavLink  to="/">
            <p className="text-lg font-bold">
                Browse All
            </p>
            </NavLink>
            <NavLink  to="/create">
            <p className="text-lg font-bold">
                Notifications
            </p>
            </NavLink>
        </ul>
        <Separator />
        <div>
          <h1 className="text-lg font-bold">Categories</h1>
          <div className='flex flex-col gap-2'>
            <div className='bg-secondary p-2 rounded-lg font-semibold text-lg'>Laptops</div>
            <div className='bg-secondary p-2 rounded-lg font-semibold text-lg'>Computers</div>
            <div className='bg-secondary p-2 rounded-lg font-semibold text-lg'>Phones</div>
            <div className='bg-secondary p-2 rounded-lg font-semibold text-lg'>TVs</div>
            <div className='bg-secondary p-2 rounded-lg font-semibold text-lg'>Audio</div>
            <div className='bg-secondary p-2 rounded-lg font-semibold text-lg'>Video Games</div>
            <div className='bg-secondary p-2 rounded-lg font-semibold text-lg'>Cameras</div>
          </div>
        </div>
      </div>
    </nav>
    
  )
}

export default SideBar