import React, { useContext } from 'react';
import { CartContext } from '../shared/CartContext';
import { ShoppingCart } from 'lucide-react';

const CartIcon = ({handleGoToCart}) => {
  const { cartCount, isCountRed } = useContext(CartContext);

  return (
    <div className="relative">
      <ShoppingCart onClick={handleGoToCart} className="h-4 w-4 hover:scale-102" />
      <span
        className={`absolute flex items-center justify-center bottom-2 left-4 bg-red-500 text-white rounded-full h-4 w-4 text-[0.6rem] ${
          isCountRed ? 'animate-pulse' : ''
        }`}
      >
        <p>{cartCount}</p>
      </span>
    </div>
  );
};

export default CartIcon;