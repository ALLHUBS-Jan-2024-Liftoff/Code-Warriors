import React, { useContext } from 'react';
import { CartContext } from '../shared/CartContext';
import { ShoppingCart } from 'lucide-react';

const CartIcon = () => {
  const { cartCount, isCountRed } = useContext(CartContext);

  return (
    <div className="relative">
      <ShoppingCart className="text-2xl" />
      <span
        className={`absolute top-5 right-5 bg-red-500 text-white rounded-full px-2 py-1 text-xs ${
          isCountRed ? 'animate-pulse' : ''
        }`}
      >
        {cartCount}
      </span>
    </div>
  );
};

export default CartIcon;