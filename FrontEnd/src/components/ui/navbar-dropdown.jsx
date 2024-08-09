import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from './input';
import { Button } from './button';
import { useNavigate } from 'react-router-dom';
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

const NavDropdown = ({ isOpen, menuItems }) => {

  const placeholders = [
    'Apple - MacBook Pro 14" Laptop with M2 Pro Chip',
    "Canon - EOS Rebel T7 DSLR Camera with 18-55mm",
    "Logitech - Bluetooth Over-Ear Headphones",
    "Sony - Alpha a6400 Mirrorless Camera",
    "iPhone 15 Pro",
  ];

  const navigate = useNavigate();

  const listItemVariants = {
    hidden: { opacity: 0, x: 50, y: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay: i * 0.025,
        duration: 0.3,
        ease: 'easeInOut',
      },
    }),
    exit: { opacity: 0, y: '-3rem', transition: { duration: 0.2, ease: 'easeInOut' } },
  };

  const [searchTerm, setSearchTerm] = useState("")

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  function handleSearch() {
    navigate(`/results/${searchTerm}`)
    window.location.reload();
  }

  return (
    <motion.div
      initial={{ y: '-3rem%', opacity: 0 }}
      animate={{ y: isOpen ? '0%' : '-3rem%', opacity: isOpen ? 1 : 0 }}
      exit={{ y: '-3rem', opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-12 left-0 h-[45vh] w-full bg-secondary z-20"
    >
      {menuItems.length === 0 ? (
        <div className='h-full w-full mt-[2%]'>
          <div className='relative flex w-full justify-center'>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleSearchChange}
            onSubmit={handleSearch}
          />
          </div>
        </div>
        
      ) : (
        <ul className="flex flex-col ml-[30%] gap-4 text-sm p-4">
          {menuItems.map((item, index) => (
            <motion.li
              key={item}
              custom={index}
              initial="hidden"
              exit="exit"
              animate={isOpen ? 'visible' : 'hidden'}
              variants={listItemVariants}
              className='font-semibold text-xl'
            >
              {item}
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default NavDropdown;