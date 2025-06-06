"use client"

import React, { useState } from 'react';
import HeaderWithTransparency from '@/components/HeaderWithTransparency';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import recipesData from '@/lib/recipes.json';
import { RecipeCard } from '@/components/RecipeCard';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const recipes = recipesData.recipes;

  // Common recipe categories for quick search
  const quickSearchCategories = [
    "Quick", "Bestseller", "Calorie Smart", "Spicy",
    "Carb Smart", "Family Friendly"
  ];

  const handleQuickSearch = (category: string) => {
    // Toggle the category in the active categories array
    if (activeCategories.includes(category)) {
      setActiveCategories(activeCategories.filter(cat => cat !== category));
    } else {
      setActiveCategories([...activeCategories, category]);
    }
  };

  // Filter recipes based on both search term and active categories
  const filteredRecipes = recipes.filter(recipe => {
    // First check if the recipe matches the search term
    const matchesSearchTerm = 
      !searchTerm || 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      (recipe.description && recipe.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Then check if it matches ALL of the active categories
    const matchesAllCategories = 
      activeCategories.length === 0 || 
      (recipe.tags && activeCategories.every(category => 
        recipe.tags.some(tag => 
          tag.toLowerCase().includes(category.toLowerCase())
        )
      ));
    
    // Return true only if both conditions are met
    return matchesSearchTerm && matchesAllCategories;
  });

  return (
    <main className="flex min-h-screen flex-col">
      <HeaderWithTransparency />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-culinairy-teal to-culinairy-cyan mb-4">
             
            </h1>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-culinairy-teal to-culinairy-cyan mb-4">
            Effortless AI Meal Planning, 
            </h1>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-culinairy-teal to-culinairy-cyan mb-4">
            Picture It. Cook It. Enjoy It.
            </h1>
          <p className="text-lg text-culinairy-lightGray max-w-2xl mx-auto">
            Discover recipes thoughtfully optimized for flavor, ease, and variety.
          </p>
        </div>
        
        <div className="max-w-xl mx-auto mb-6">
          <div className="relative rounded-xl border border-gray-300 dark:border-gray-600 shadow-sm overflow-hidden">
            <input
              type="text"
              placeholder="Search recipes by name, ingredients, or tags..."
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-culinairy-teal pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-0 top-0 h-full flex items-center pr-3">
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="p-1 mr-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button 
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                onClick={() => {
                  // You could add additional search functionality here if needed
                }}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="text-xs text-center text-gray-500 mt-2">
            Try searching for "quick", "spicy", or "vegetarian"
          </div>
        </div>
        
        {/* Quick search buttons */}
        <div className="max-w-4xl mx-auto mb-12 flex flex-wrap justify-center gap-2">
          {quickSearchCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleQuickSearch(category)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                ${activeCategories.includes(category) 
                  ? 'bg-culinairy-teal text-white' 
                  : 'bg-culinairy-teal/10 text-culinairy-teal hover:bg-culinairy-teal/20 dark:bg-culinairy-teal/20 dark:hover:bg-culinairy-teal/30'
                }`}
            >
              {category}
            </button>
          ))}
          {activeCategories.length > 0 && (
            <button
              onClick={() => setActiveCategories([])}
              className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Clear Filters ×
            </button>
          )}
        </div>
        
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 dark:text-gray-400">No recipes found. Try a different search term or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </main>
  );
}
