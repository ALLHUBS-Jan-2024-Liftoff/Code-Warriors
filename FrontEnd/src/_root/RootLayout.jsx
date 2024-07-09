import Topbar from '@/components/shared/Topbar';
import React from 'react'
import { Outlet } from "react-router-dom";
import Sidebar from '../components/shared/Sidebar'

const RootLayout = () => {
  
  return (
    <div className='h-screen flex flex-col'>
        <Topbar />
        <div className='flex flex-1 pt-16'>
          <Sidebar />
          <Outlet />
        </div>
    </div>
  )
}

export default RootLayout