import Topbar from '@/components/shared/Topbar';
import React from 'react'
import { Outlet } from "react-router-dom";
import Sidebar from '../components/shared/Sidebar'
import { CartProvider } from '../components/shared/CartContext';
import '@/index.css';

const RootLayout = () => {
  
  return (
    <div className='vh-[100%] flex flex-col'>
       <CartProvider>
       <Topbar />        
        <div className='flex w-full flex-1 my-16'>
          <Outlet />
        </div>
        </CartProvider>
    </div>
  )
}

export default RootLayout