import React, { use } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer'; 
import Image from 'next/image';
import { notFound } from 'next/navigation'; // Import notFound
import HeaderWithTransparency from '@/components/HeaderWithTransparency';
import AddToShoppingListButton from '@/components/AddToShoppingListButton';
import { Metadata } from 'next';
import recipesData from '@/lib/recipes.json';
import { Recipe, Ingredient, Step } from '@/../types/Recipe'; // Import shared types

export const metadata: Metadata = {
  title: 'Recipe Details - CulinAIry.io',
  description: 'Detailed recipe with ingredients and instructions - CulinAIry.io'
};

export async function generateStaticParams() {
  return recipesData.recipes.map((recipe) => ({
    id: recipe.id
  }));
}

// Removed local interface definitions - using imported types now

async function getRecipeById(id: string): Promise<Recipe | undefined> {
  // Type assertion needed because recipes.json might not perfectly match Recipe type yet
  // We already fixed dietary_info, but other discrepancies might exist.
  // This tells TypeScript to trust that the found object conforms to Recipe.
  return recipesData.recipes.find((r) => r.id === id) as Recipe | undefined;
}


export default async function RecipeDetail({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    notFound(); // Use notFound() to trigger the 404 page
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-200">
      <HeaderWithTransparency showNav={false} backLink="/" backLinkText="Back to Recipes" />

      <main className="max-w-7xl mx-auto px-4 py-12 pt-24">
        <div className="mb-12">

          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="relative aspect-[3/2] rounded-lg overflow-hidden shadow-md md:col-span-2">
              <Image
                src={recipe.image_url}
                alt={recipe.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="md:col-span-1">
              <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{recipe.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">{recipe.subtitle || recipe.description}</p> 
              {/* Use subtitle if available, otherwise description */}

              <div className="bg-gray-100/80 dark:bg-gray-700/30 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {recipe.description} 
                {/* Use description here */}
              </p>
              </div>

              <div className="flex items-center space-x-4 mb-8">
                {/* Use correct properties from JSON */}
                <div className="flex items-center">
                  {recipe.total_time && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-culinairy-teal mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">{recipe.total_time}</span>
                    </div>
                  )}
                  {recipe.prep_time && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-culinairy-cyan mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-sm">Prep: {recipe.prep_time}</span>
                    </div>
                  )}
                  {recipe.calories_per_serving && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-culinairy-teal mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <span className="text-sm">{recipe.calories_per_serving}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {/* Use recipe.tags */}
                {recipe.tags?.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 text-sm bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-full">{tag}</span>
                ))}
              </div>

              <AddToShoppingListButton recipeId={recipe.id} />
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Ingredients</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {recipe.ingredients.map((ingredient: Ingredient) => (
                <div 
                  key={ingredient.name}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <div className="relative w-1/2 mx-auto aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <Image
                      src={ingredient.image_url}
                      alt={ingredient.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">{ingredient.name}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{ingredient.quantity}</p> 
                  {/* Use quantity */}
                </div>
              ))}
            </div>
          </div>
        </div>
         {/* Cooking Steps */}
         {/* Cooking Steps - Use recipe.cooking_steps */}
         <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Cooking Steps</h2>
          <div className="space-y-8">
            {recipe.cooking_steps.map((step: Step) => (
              <div key={step.step} className="flex flex-col md:flex-row gap-6">
                <div className="flex md:w-1/2">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-culinairy-teal text-white font-bold text-xl mr-4">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
                  </div>
                </div>
                {step.image_url && (
                  <div className="md:w-1/2 mt-4 md:mt-0">
                    <Image
                      src={step.image_url || '/images/steps/default-step.png'}
                      alt={`Step ${step.step}`}
                      width={750}
                      height={500}
                      className="rounded-lg w-full h-auto"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer /> {/* Replace the inline footer with this */}
    </div>
  );
};
