import Image from 'next/image';
import { Recipe } from '../../types/Recipe';
import Link from 'next/link';

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col h-full">
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
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{recipe.title || 'Recipe Title'}</h2>
          {recipe.subtitle && (
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{recipe.subtitle}</h3>
          )}
          {/* Description paragraph removed */}
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
            {(recipe.cousine || "Other") && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                {recipe.cousine || "Other"} Cuisine
              </span>
            )}
          </div>
        </div>
        <div className="mt-auto">
          <Link
            href={`/recipes/${recipe.id}`}
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-culinairy-teal to-culinairy-cyan rounded-lg hover:opacity-90 transition-opacity"
          >
            Recipe Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
