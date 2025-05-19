"use client"

import React, { useState } from 'react';
import HeaderWithTransparency from '@/components/HeaderWithTransparency';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import recipesData from '@/lib/recipes.json';
import ClientSideSearch from '@/components/ClientSideSearch'; // We'll create this component

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
        
        {/* Move client-side search functionality to a separate component */}
        <ClientSideSearch recipes={recipes} />
      </div>
      
      <Footer />
    </main>
  );
}
