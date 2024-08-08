import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from './input';
import { Button } from './button';
import { useNavigate } from 'react-router-dom';

const NavDropdown = ({ isOpen, menuItems }) => {

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
        <div className='h-full w-full mt-[2%] ml-[30%]'>
          <div className='relative flex w-full'>
          <form onSubmit={handleSearch} className='relative flex w-full'>
            <Search className="absolute left-2.5 bottom-4 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={handleSearchChange}
              type="search"
              placeholder="Search..."
              className="w-[400px] focus-visible:ring-0 focus-visible:ring-none focus-visible:ring-offset-0 rounded-lg bg-background text-xl font-semibold h-12 pl-8 md:w-[200px] lg:w-[40%]"
            />
          </form>
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