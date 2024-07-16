import React from 'react'
import { NavLink } from 'react-router-dom'
import { Separator } from '../ui/separator'
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react"


const SideBar = () => {

  return (
    <aside className="w-64 flex-col border-r bg-background sm:flex">
      <nav className="grid items-start gap-4 pt-8 px-2 text-sm font-medium lg:px-4">
        <div className='border-b h-48'>
          <Link
              to=""
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-base text-muted-foreground transition-all hover:text-primary"
            >
              Category
          </Link>
        </div>
        <div className='border-b h-48'>
          <Link
              to=""
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-base text-muted-foreground transition-all hover:text-primary"
            >
              Price
          </Link>
        </div>
        <div className='border-b h-48'>
          <Link
              to=''
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-base text-muted-foreground transition-all hover:text-primary"
            >
              Brand
          </Link>
        </div>
        </nav>
    </aside>
    
  )
}

export default SideBar