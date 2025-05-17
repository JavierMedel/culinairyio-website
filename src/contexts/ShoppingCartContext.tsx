"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

// Define the type for our context
interface ShoppingCartContextType {
  cart: string[];
  addToCart: (recipeId: string) => void;
  removeFromCart: (recipeId: string) => void;
  clearCart: () => void;
  isInCart: (recipeId: string) => boolean;
}

// Create context with proper typing
export const ShoppingCartContext = createContext<ShoppingCartContextType | null>(null);

export const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<string[]>([]);
  
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
  
  const addToCart = (recipeId: string) => {
    if (!isInCart(recipeId)) {
      setCart([...cart, recipeId]);
    }
  };
  
  const removeFromCart = (recipeId: string) => {
    setCart(cart.filter(id => id !== recipeId));
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  const isInCart = (recipeId: string) => {
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

// Create a hook for using the shopping cart context
export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error("useShoppingCart must be used within a ShoppingCartProvider");
  }
  return context;
};