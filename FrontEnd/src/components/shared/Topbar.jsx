import React from 'react'
import { NavLink } from 'react-router-dom'
import { Input } from '../ui/input'
import { Search, ShoppingCart, Store } from "lucide-react"
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
    <div className='fixed z-50 top-0 bg-background flex items-center justify-center w-full h-16 px-6'>
          <div className='flex items-center gap-8'>
            <Store onClick={handleGoToHero} className="h-4 w-4 text-muted-foreground hover:text-foreground hover:scale-102 transition-transform"/>
            <ul className='flex gap-6 text-sm text-muted-foreground'>
              <li className='hover:text-foreground hover:scale-102 transition-transform'>Laptops</li>
              <li className='hover:text-foreground hover:scale-102 transition-transform'>Phones</li>
              <li className='hover:text-foreground hover:scale-102 transition-transform'>Cameras</li>
              <li className='hover:text-foreground hover:scale-102 transition-transform'>Computers</li>
              <li className='hover:text-foreground hover:scale-102 transition-transform'>Headphones</li>
              <li className='hover:text-foreground hover:scale-102 transition-transform'>Accessories</li>
            </ul>
            <Search onClick={handleGoToResults} className="h-4 w-4 text-muted-foreground hover:text-foreground hover:scale-102 transition-transform"/>
            <ShoppingCart onClick={handleGoToCart} className="h-4 w-4 text-muted-foreground hover:text-foreground hover:scale-102 transition-transform"/>
          </div>
    </div>
  )
}

export default Topbar