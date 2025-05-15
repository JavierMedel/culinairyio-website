import Image from 'next/image';
import { Recipe } from '../../types/Recipe';
import Link from 'next/link';
import { useShoppingCart } from './ShoppingCartContext';
import { useState } from 'react';

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { addToCart, shoppingCart } = useShoppingCart();
  const [showToast, setShowToast] = useState(false);
  const isInCart = shoppingCart.some(item => item.recipeId === recipe.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isInCart) {
      addToCart(recipe.id);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <div className="relative aspect-[4/3] overflow-hidden">
        {recipe.image_url ? (
          <Image
            src={recipe.image_url}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{recipe.title || 'Recipe Title'}</h2>
        {recipe.subtitle && (
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{recipe.subtitle}</h3>
        )}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {recipe.description || 'No description available.'}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.prep_time && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Prep: {recipe.prep_time}
            </span>
          )}
          {recipe.cooking_time ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Cook: {recipe.cooking_time}
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              Cook: —
            </span>
          )}
          {recipe.calories_per_serving && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
              {recipe.calories_per_serving} cal
            </span>
          )}
          {recipe.difficulty && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              {recipe.difficulty}
            </span>
          )}
        </div>
        <Link
          href={`/recipes/${recipe.id}`}
          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-culinairy-teal to-culinairy-cyan rounded-lg hover:opacity-90 transition-opacity mb-2"
        >
          View Recipe →
        </Link>
        <button
          onClick={handleAddToCart}
          disabled={isInCart}
          aria-label="Add recipe to shopping list"
          className={`inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-culinairy-teal ${isInCart ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-culinairy-teal text-white hover:opacity-90'}`}
        >
          {isInCart ? 'Added to Shopping List' : 'Add to Shopping List'}
        </button>
        {/* Toast Notification */}
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
    </div>
  );
}
