import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'
import apiClient from '@/services/apiClient';

const CartContext = createContext();

const CartProvider = ({ children }) => {

  const [products, setProducts] = useState([]);
  const[cartTotal, setCartTotal] = useState(0.0);

  const fetchProducts = async () => {
    try {
      const [response1] = await Promise.all([
        apiClient.get('cart/userCart'),  // Replace with your first API URL
      ]);
      setProducts(response1.data);
      
    } catch (error) {
      console.error('Error fetching the products:', error);
    }
  };
  
    useEffect(() => {
      fetchProducts();
    }, []);

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
      const response = await apiClient.post('cart/addProduct', cartDto)
      fetchProducts();
      console.log(response.data)
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart, isCountRed, products, setProducts, cartTotal, setCartTotal, fetchProducts}}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };