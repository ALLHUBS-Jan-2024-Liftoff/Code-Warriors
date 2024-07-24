import React from 'react';
import { motion } from 'framer-motion';

const NavDropdown = ({ isOpen, menuItems }) => {

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

  return (
    <motion.div
      initial={{ y: '-3rem%', opacity: 0 }}
      animate={{ y: isOpen ? '0%' : '-3rem%', opacity: isOpen ? 1 : 0 }}
      exit={{ y: '-3rem', opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-12 left-0 h-[45vh] w-full bg-secondary z-20"
    >
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
    </motion.div>
  );
};

export default NavDropdown;