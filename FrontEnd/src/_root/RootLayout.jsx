import Topbar from '@/components/shared/Topbar';
import React from 'react'
import { Outlet } from "react-router-dom";
import Sidebar from '../components/shared/Sidebar'
import '@/index.css';

const RootLayout = () => {
  
  return (
    <div className='h-screen w-full flex flex-col'>
       <Topbar />        
        <div className='scrollable-container flex w-full flex-1 min-h-0 overflow-y-auto py-14'>
          <Outlet />
        </div>
    </div>
  )
}

export default RootLayout