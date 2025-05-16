"use client";
import React, { useMemo, useState, useEffect } from "react";
import { useShoppingCart } from "@/components/ShoppingCartContext";
import recipesData from "@/lib/recipes.json";
import type { Recipe, Ingredient } from "../../../types/Recipe";
import Link from "next/link";
import Image from "next/image";
import HeaderWithTransparency from "@/components/HeaderWithTransparency";

function parseQuantity(q: string | number | undefined) {
  if (typeof q === "number") return q;
  if (typeof q === "string") {
    const num = parseFloat(q);
    return isNaN(num) ? 1 : num;
  }
  return 1;
}

function aggregateIngredients(recipes: Recipe[]) {
  const grouped: Record<string, Record<string, any>> = {};
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const cat = ingredient.category || "Ingredients";
      const key = `${ingredient.name.toLowerCase()}__${ingredient.unit || ""}`;
      if (!grouped[cat]) grouped[cat] = {};
      if (!grouped[cat][key]) {
        grouped[cat][key] = {
          ...ingredient,
          totalQty: parseQuantity(ingredient.quantity),
          units: new Set([ingredient.unit]),
          unitMismatch: false,
          checked: false,
          recipes: [recipe.title],
        };
      } else {
        if (grouped[cat][key].unit === ingredient.unit) {
          grouped[cat][key].totalQty += parseQuantity(ingredient.quantity);
        } else {
          grouped[cat][key].unitMismatch = true;
        }
        grouped[cat][key].units.add(ingredient.unit);
        grouped[cat][key].recipes.push(recipe.title);
      }
    });
  });
  return grouped;
}

export default function ShoppingListClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { shoppingCart, removeFromCart, clearCart } = useShoppingCart();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [removedIngredients, setRemovedIngredients] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const selectedRecipes = useMemo(() => {
    return shoppingCart
      .map((item) => recipesData.recipes.find((r: any) => r.id === item.recipeId))
      .filter(Boolean) as Recipe[];
  }, [shoppingCart]);

  const groupedIngredients = useMemo(
    () => aggregateIngredients(selectedRecipes),
    [selectedRecipes]
  );

  function handleCheck(cat: string, key: string) {
    setCheckedItems((prev) => ({ ...prev, [cat + key]: !prev[cat + key] }));
  }

  function handleRemoveIngredient(category: string, ingredientKey: string) {
    setRemovedIngredients((prev) => ({
      ...prev,
      [category + ingredientKey]: true,
    }));
  }

  function handleCopy() {
    let text = "Shopping List:\n";
    Object.entries(groupedIngredients).forEach(([cat, categoryItems]) => {
      const visibleIngredients = Object.entries(categoryItems)
        .filter(([key]) => !removedIngredients[cat + key])
        .map(([, item]) => item);

      if (visibleIngredients.length > 0) {
        text += `\n${cat}:\n`;
        visibleIngredients.forEach((item) => {
          text += `- ${item.totalQty} ${item.unit || ""} ${item.name}`;
          if (item.unitMismatch) text += ` (unit mismatch)`;
          text += "\n";
        });
      }
    });

    navigator.clipboard.writeText(text.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleRemoveRecipeIngredients(recipeId: string) {
    const recipeData = recipesData.recipes.find((r) => r.id === recipeId);
    if (recipeData) {
      const updates = { ...removedIngredients };
      for (const ingredient of recipeData.ingredients) {
        const cat = ingredient.category || "Ingredients";
        const key = `${ingredient.name.toLowerCase()}__${ingredient.unit || ""}`;
        updates[cat + key] = true;
      }
      setRemovedIngredients(updates);
      setCheckedItems((prev) => {
        const newChecked = { ...prev };
        for (const ingredient of recipeData.ingredients) {
          const cat = ingredient.category || "Ingredients";
          const key = `${ingredient.name.toLowerCase()}__${ingredient.unit || ""}`;
          delete newChecked[cat + key];
        }
        return newChecked;
      });
    }
  }

  if (!mounted) return null;

  return (
    <>
      <HeaderWithTransparency showNav={false} />
      <main className="max-w-2xl mx-auto px-4 pt-24 pb-12">
        <div>
          {selectedRecipes.length === 0 ? (
            <div className="text-center py-24">
              <h1 className="text-3xl font-bold mb-8">Your Shopping List is Empty</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Your shopping list is empty. Add recipes to your cart from the recipe collection to see ingredients here.
              </p>
              <div className="mt-6">
                <Link 
                  href="/" 
                  className="px-8 py-3 rounded bg-culinairy-teal hover:bg-culinairy-cyan text-white text-lg font-medium transition-colors duration-200"
                >
                  View Recipe Collection
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                You can add recipes by visiting recipes and clicking the "Add to Cart" button
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Your Shopping List</h1>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to clear your entire shopping list?")) {
                      clearCart();
                      setCheckedItems({});
                      setRemovedIngredients({});
                    }
                  }}
                  className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
                  aria-label="Clear entire shopping list"
                >
                  Clear All
                </button>
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Recipes in list: {selectedRecipes.length}
                </p>
                <button
                  className="px-4 py-2 rounded bg-culinairy-teal hover:bg-culinairy-cyan text-white text-sm"
                  onClick={handleCopy}
                  aria-label="Copy shopping list to clipboard"
                >
                  {copied ? "Copied!" : "Copy to Clipboard"}
                </button>
              </div>

              {Object.entries(groupedIngredients).map(([cat, items]) => {
                const visibleCategoryItems = Object.entries(items).filter(
                  ([key]) => !removedIngredients[cat + key]
                );

                if (visibleCategoryItems.length === 0) return null;

                return (
                  <div key={cat} className="mb-8 p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
                    <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">{cat}</h2>
                    <ul>
                      {visibleCategoryItems.map(([key, item]) => (
                        <li key={key} className="flex flex-col mb-2 py-2 border-b border-gray-100 dark:border-gray-700/50 last:border-b-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                aria-label={`Mark ${item.name} as purchased`}
                                checked={!!checkedItems[cat + key]}
                                onChange={() => handleCheck(cat, key)}
                                className="mr-3 h-5 w-5 text-culinairy-teal focus:ring-culinairy-cyan border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-offset-gray-800"
                              />
                              <span className={`${checkedItems[cat + key] ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-800 dark:text-gray-200"}`}>
                                {item.totalQty} {item.unit || ""} {item.name}
                                {item.unitMismatch && (
                                  <span className="text-xs text-red-500 ml-2">(unit mismatch)</span>
                                )}
                              </span>
                            </div>
                            <button
                              onClick={() => handleRemoveIngredient(cat, key)}
                              className="ml-3 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-800/50 group"
                              aria-label={`Remove ${item.name} from list`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          <div className="ml-8 mt-1 text-xs text-gray-500 dark:text-gray-400">
                            From: {item.recipes.join(", ")}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Recipes</h2>
                <div className="space-y-3">
                  {selectedRecipes.map((recipe) => (
                    <div key={recipe.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <div className="w-12 h-12 relative rounded-md overflow-hidden mr-3">
                          {recipe.image_url && (
                            <Image
                              src={recipe.image_url}
                              alt={recipe.title}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{recipe.title}</h3>
                          <Link href={`/recipes/${recipe.id}`} className="text-xs text-culinairy-teal hover:underline">
                            View Recipe
                          </Link>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (window.confirm(`Remove ${recipe.title} from your shopping list? This will remove all ingredients from this recipe.`)) {
                            handleRemoveRecipeIngredients(recipe.id);
                            removeFromCart(recipe.id);
                          }
                        }}
                        className="px-3 py-1 text-xs rounded bg-red-500 hover:bg-red-600 text-white"
                        aria-label={`Remove ${recipe.title} from shopping list`}
                      >
                        Remove Recipe
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
