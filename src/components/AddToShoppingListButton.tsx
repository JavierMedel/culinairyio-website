"use client";
import React, { useState } from 'react';
import { useShoppingCart } from './ShoppingCartContext';

export default function AddToShoppingListButton({ recipeId }: { recipeId: string }) {
  const { addToCart, shoppingCart } = useShoppingCart();
  const [showToast, setShowToast] = useState(false);
  const isInCart = shoppingCart.some(item => item.recipeId === recipeId);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(recipeId);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div className="mb-8">
      <button
        onClick={handleAddToCart}
        disabled={isInCart}
        aria-label="Add recipe to shopping list"
        className={`inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-culinairy-teal ${isInCart ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-culinairy-teal text-white hover:opacity-90'}`}
      >
        {isInCart ? 'Added to Shopping List' : 'Add to Shopping List'}
      </button>
      {showToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-culinairy-teal text-white px-4 py-2 rounded shadow-lg animate-fade-in"
        >
          Recipe added to your shopping list.
        </div>
      )}
    </div>
  );
}
