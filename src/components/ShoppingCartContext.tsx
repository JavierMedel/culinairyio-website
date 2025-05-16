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
  isInCart: (recipeId: string) => boolean; // Added isInCart
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
    if (typeof window !== 'undefined') {
      localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    }
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

  // Added isInCart implementation
  const isInCart = (recipeId: string): boolean => {
    return shoppingCart.some((item) => item.recipeId === recipeId);
  };

  return (
    <ShoppingCartContext.Provider value={{ shoppingCart, addToCart, removeFromCart, clearCart, isInCart }}> {/* Added isInCart to provider value */}
      {children}
    </ShoppingCartContext.Provider>
  );
};
