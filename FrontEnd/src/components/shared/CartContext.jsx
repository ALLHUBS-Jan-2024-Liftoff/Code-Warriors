import React, { createContext, useState } from 'react';
import axios from 'axios'

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [isCountRed, setIsCountRed] = useState(false);

  const addToCart = async (product, quantities) => {
    setCartCount(cartCount + 1);
    setIsCountRed(true);
    setTimeout(() => setIsCountRed(false), 500);
    
    // Change back to original color after 500ms

    const cartDto = {
        productId: product.productId,
        productName: product.productName,
        price: product.price,
        quantity:quantities
      };
    
      addProductTocart(cartDto);
  };
  const addProductTocart = async (cartDto) => {
    try {
      console.log(cartDto);
      const response = await axios.post('http://localhost:8080/cart/addProduct', cartDto, {
        headers: {
          'Content-Type': 'application/json',
          'userId': 1
        }
      })
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart, isCountRed }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };