import React from 'react'
import { NavLink } from 'react-router-dom'
import { Input } from '../ui/input'
import { Search, ShoppingCart } from "lucide-react"
import { Button } from '../ui/button'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faBell } from "@fortawesome/free-solid-svg-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate } from 'react-router-dom';


const Topbar = () => {

  const navigate = useNavigate();

  const handleGoToCart = () => {
    navigate('/cart');
};

const handleGoToResults = () => {
    navigate('/results');
};

const handleGoToHero = () => {
    navigate('/');
};

const handleGoToAdmin = () => {
    navigate('/admin');
};



  return (
    <div className='fixed z-50 top-0 bg-background flex items-center justify-between w-full h-16 px-6'>
        <h1 onClick={handleGoToHero} className='text-2xl font-bold text-primary'>Digital Delights</h1>
        <div className='w-1/2 flex items-center'>
          <Select>
            <SelectTrigger className="w-[195px]">
              <SelectValue  placeholder="Shop by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative py-2 w-full flex justify-center items-center">
              <Search className="absolute left-4 top-6 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8 h-12 w-full mx-2"/>
              <Button onClick={handleGoToResults}>Search</Button>
              <Button onClick={handleGoToAdmin} className='ml-2'>Admin</Button>
          </div>
        </div>
        <div className='flex gap-8'>
          <FontAwesomeIcon size='md' className='text-muted-foreground' icon={faBell} />
          
          <ShoppingCart onClick={handleGoToCart} className="h-5 w-5 text-muted-foreground"/>
        </div>
    </div>
  )
}

export default Topbar