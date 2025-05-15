"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface ShoppingCartItem {
  recipeId: string;
}

interface ShoppingCartContextType {
  shoppingCart: ShoppingCartItem[];
  addToCart: (recipeId: string) => void;
  removeFromCart: (recipeId: string) => void;
  clearCart: () => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) throw new Error('useShoppingCart must be used within ShoppingCartProvider');
  return context;
};

export const ShoppingCartProvider = ({ children }: { children: ReactNode }) => {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('shoppingCart');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  const addToCart = (recipeId: string) => {
    setShoppingCart((prev) => {
      if (prev.some((item) => item.recipeId === recipeId)) return prev;
      return [...prev, { recipeId }];
    });
  };

  const removeFromCart = (recipeId: string) => {
    setShoppingCart((prev) => prev.filter((item) => item.recipeId !== recipeId));
  };

  const clearCart = () => setShoppingCart([]);

  return (
    <ShoppingCartContext.Provider value={{ shoppingCart, addToCart, removeFromCart, clearCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
