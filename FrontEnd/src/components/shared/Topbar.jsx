import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Search, ShoppingCart, UserRound } from 'lucide-react'; // replace with actual imports
import NavDropdown from '../ui/navbar-dropdown'; // import the Dropdown component
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';

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

  const handleGoToAdminSignin = () => {
    navigate('/admin_sign_in');
  };

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
    }, 400); // Adjust the delay as needed
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

  return (
    <div className="fixed z-50 top-0 bg-background flex items-center justify-center w-full h-12 px-6 bg-secondary">
      <div className="flex items-center gap-8">
        <Store onClick={handleGoToHero} className="h-4 w-4 hover:text-foreground hover:scale-102 transition-transform" />
        <ul className="flex gap-6 text-sm">
          <li className="hover:scale-103" onMouseEnter={() => handleMouseEnter(laptopItems)}>Laptops</li>
          <li className="hover:scale-103" onMouseEnter={() => handleMouseEnter(phoneItems)}>Phones</li>
          <li className="hover:scale-103" onMouseEnter={() => handleMouseEnter(cameraItems)}>Cameras</li>
          <li className="hover:scale-103" onMouseEnter={() => handleMouseEnter(computerItems)}>Computers</li>
          <li className="hover:scale-103" onMouseEnter={() => handleMouseEnter(headphoneItems)}>Headphones</li>
          <li className="hover:scale-103" onMouseEnter={() => handleMouseEnter(accessoryItems)}>Accessories</li>
        </ul>
        <Search onClick={handleGoToResults} className="h-4 w-4 hover:scale-102" />
        <ShoppingCart onClick={handleGoToCart} className="h-4 w-4 hover:scale-102" />
        <UserRound onClick={handleGoToAdmin} className="h-4 w-4 hover:scale-102" />
        <Button size="sm" onClick={handleGoToAdminSignin}>Admin Sign in</Button>
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
              <NavDropdown menuItems={dropdownItems} isOpen={dropdownVisible}/>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Topbar;