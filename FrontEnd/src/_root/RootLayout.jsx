import Topbar from '@/components/shared/Topbar';
import React from 'react'
import { Outlet } from "react-router-dom";
import Sidebar from '../components/shared/Sidebar'

const RootLayout = () => {
  
  return (
    <div className='vh-[100%] flex flex-col'>
        <Topbar />
        <div className='flex flex-1 my-16'>
          <Outlet />
        </div>
    </div>
  )
}

export default RootLayout