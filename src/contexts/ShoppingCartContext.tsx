'use client'; // Add this line at the very top

import { createContext, useState, useEffect } from 'react';

export const ShoppingCartContext = createContext(null);

export const ShoppingCartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }, [cart]);
  
  const addToCart = (recipeId) => {
    if (!isInCart(recipeId)) {
      setCart([...cart, recipeId]);
    }
  };
  
  const removeFromCart = (recipeId) => {
    setCart(cart.filter(id => id !== recipeId));
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  const isInCart = (recipeId) => {
    return cart.includes(recipeId);
  };
  
  return (
    <ShoppingCartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      isInCart 
    }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};