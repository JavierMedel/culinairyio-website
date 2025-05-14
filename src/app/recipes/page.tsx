import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeaderWithTransparency from '@/components/HeaderWithTransparency';
import { Metadata } from 'next';
import recipesData from '@/lib/recipes.json';

export const metadata: Metadata = {
  title: 'Recipes - CulinAIry.io',
  description: 'Discover AI-powered recipes tailored to your taste - CulinAIry.io'
};

const recipes = recipesData.recipes;

const RecipesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-200">
      <HeaderWithTransparency showNav={false} />

      <main className="max-w-7xl mx-auto px-4 py-12 pt-24">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">AI-Powered Recipes</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Discover delicious recipes tailored to your taste preferences and dietary needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipes/${encodeURIComponent(recipe.id)}`}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 block border border-gray-200 dark:border-gray-700"
            >
              <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-700"> 
                {/* Added background color for missing images */}
                {recipe.image_url && ( // Conditionally render Image
                  <Image
                    src={recipe.image_url} // Use correct property
                    alt={recipe.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{recipe.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{recipe.description}</p>
                
                <div className="flex items-center space-x-4 mb-4">
                  {/* Use correct properties */}
                  {recipe.cooking_time && (
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-culinairy-teal mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm">{recipe.cooking_time}</span>
                    </div>
                  )}
                  {recipe.prep_time && (
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-culinairy-cyan mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="text-sm">{recipe.prep_time}</span>
                    </div>
                  )}
                  {recipe.calories_per_serving && (
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-culinairy-teal mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      <span className="text-sm">{recipe.calories_per_serving}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {recipe.tags?.map((tag) => ( // Use optional chaining for tags
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="w-full py-6 px-4 border-t border-gray-200 dark:border-gray-800 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 dark:text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} CulinAIry.io. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <Link href="/terms" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              Privacy
            </Link>
            <a
              href="mailto:hello@culinairy.ai"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RecipesPage;
