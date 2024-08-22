import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Search, ShoppingCart, UserRound } from 'lucide-react'; // replace with actual imports
import NavDropdown from '../ui/navbar-dropdown'; // import the Dropdown component
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import CartIcon from '../ui/CartIcon';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { CartContext } from './CartContext';
import {
  Truck,
} from "lucide-react";

const Topbar = () => {

  
  const navigate = useNavigate();

  const { fetchProducts, clearCartCount } = useContext(CartContext);

  let { user, logoutUser } = useContext(AuthContext);

  const userId = user ? user.userId : null;

  const handleGoToCart = () => {
    
    if(user) {
      navigate('/cart');
    } else {
      navigate('/user_auth')
    }
  }
    

  const handleGoToResults = () => {
    navigate('/results');
  };

  const handleGoToHero = () => {
    navigate('/');
  };
  const handleGoToAdmin = () => {
    navigate('/admin');
  };

  const handleTrackOrder = () => {  
    console.log("handle Track order method"+userId) ;
    navigate(`/order-tracking/${userId}`); 
 };


  function handleLogoutUser() {
    logoutUser();
    clearCartCount();
    fetchProducts();
    
  }

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownItems, setDropdownItems] = useState([])
  const timeoutRef = useRef(null);

  

  const handleMouseEnter = (items) => {
    clearTimeout(timeoutRef.current);
    setDropdownItems(items);
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownVisible(false);
    }, 300); // Adjust the delay as needed
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const laptopItems = [
    'MacBook Air',
    'MacBook Pro',
    'HP Spectre x360',
    'HP Envy 13',
    'Chromebook Pixelbook',
    'Dell XPS 13',
  ];
  
  const phoneItems = [
    'iPhone 13',
    'iPhone 13 Pro',
    'Samsung Galaxy S21',
    'Samsung Galaxy Note 20',
    'Google Pixel 6',
    'OnePlus 9',
  ];
  
  const cameraItems = [
    'Sony Alpha a7 III',
    'Canon EOS R5',
    'Nikon Z6 II',
    'Fujifilm X-T4',
    'Panasonic Lumix GH5',
    'Olympus OM-D E-M10 Mark IV'
  ];
  
  const computerItems = [
    'Dell Inspiron',
    'HP Pavilion',
    'Lenovo IdeaCentre',
    'Asus ROG Strix',
    'Apple iMac',
  ];
  
  const headphoneItems = [
    'Bose QuietComfort 35 II',
    'Beats Studio3',
    'Apple AirPods Pro',
    'Sony WH-1000XM4',
    'Sennheiser HD 450BT',
  ];
  
  const accessoryItems = [
    'USB-C Chargers',
    'HDMI Cables',
    'Wireless Mice',
    'Laptop Stands',
    'Bluetooth Keyboards',
  ];

  const searchItemsNull = []

  

  return (
    <div className="fixed z-50 top-0 bg-background flex items-center justify-center w-full h-14 px-6 bg-secondary">
      <div className="flex items-center gap-8">
        <Store onClick={handleGoToHero} className="h-4 w-4 hover:text-foreground hover:scale-102 transition-transform" />
        <ul className="flex gap-6 text-sm font-semibold">
          <li onClick={() => {
              navigate('/results/all');
              window.location.reload();
            }}>
            All
          </li>

          <li onClick={() => {
              navigate('/results/laptops');
              window.location.reload();
            }} 
            onMouseEnter={() => handleMouseEnter(laptopItems)}>
            Laptops
          </li>

          <li onClick={() => {
              navigate('/results/phones');
              window.location.reload();
            }} 
            onMouseEnter={() => handleMouseEnter(phoneItems)}>
            Phones
          </li>

          <li onClick={() => {
              navigate('/results/cameras');
              window.location.reload();
            }} 
            onMouseEnter={() => handleMouseEnter(cameraItems)}>
            Cameras
          </li>

          <li onClick={() => {
              navigate('/results/computers');
              window.location.reload();
            }} 
            onMouseEnter={() => handleMouseEnter(computerItems)}>
            Computers
          </li>

          <li onClick={() => {
              navigate('/results/headphones');
              window.location.reload();
            }} 
            onMouseEnter={() => handleMouseEnter(headphoneItems)}>
            Headphones
          </li>

          <li onClick={() => {
              navigate('/results/accessories');
              window.location.reload();
            }} 
            onMouseEnter={() => handleMouseEnter(accessoryItems)}>
            Accessories
          </li>
        </ul>
        <Search onMouseEnter={() => handleMouseEnter(searchItemsNull)} className="h-4 w-4 hover:scale-102" />
        <CartIcon handleGoToCart={handleGoToCart} className="h-4 w-4 hover:scale-102" />        
        {user &&
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <img
                  src="/placeholder-user.jpg"
                  width={56}
                  height={56}
                  alt="Avatar"
                  className="object-cover"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogoutUser}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          }
      </div>
      <div className="gap-15 text-sm">
      {user && (
                <Button onClick={handleTrackOrder} size="sm" variant="outline" className="absolute top-0 right-0 mt-4 mr-4 py-2 px-4">
                <Truck className="h-3.5 w-3.5" />
                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                  Track Order
                </span>
                </Button>
            )}

      
      </div>
      <AnimatePresence>
        {dropdownVisible && (
          <>
            <motion.div
              className="fixed inset-0 top-12 bg-black bg-opacity-50 backdrop-blur-md z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            ></motion.div>
            <div onMouseLeave={handleMouseLeave}>
              <NavDropdown menuItems={dropdownItems} isOpen={dropdownVisible} setIsOpen={setDropdownItems}/>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Topbar;