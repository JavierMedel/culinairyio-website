"use client";
import React, { useMemo, useState } from "react";
import { useShoppingCart } from "@/components/ShoppingCartContext";
import recipesData from "@/lib/recipes.json";
import type { Recipe, Ingredient } from "../../../types/Recipe";
import Link from "next/link";
import HeaderWithTransparency from "@/components/HeaderWithTransparency";

function parseQuantity(q: string | number | undefined) {
  if (typeof q === "number") return q;
  if (typeof q === "string") {
    const num = parseFloat(q);
    return isNaN(num) ? 1 : num;
  }
  return 1;
}

function aggregateIngredients(recipes: any[]) {
  const grouped: Record<string, Record<string, any>> = {};
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient: any) => {
      const cat = ingredient.category || "Other";
      const key = `${ingredient.name.toLowerCase()}__${ingredient.unit || ""}`;
      if (!grouped[cat]) grouped[cat] = {};
      if (!grouped[cat][key]) {
        grouped[cat][key] = {
          ...ingredient,
          totalQty: parseQuantity(ingredient.quantity),
          units: new Set([ingredient.unit]),
          unitMismatch: false,
          checked: false,
        };
      } else {
        if (grouped[cat][key].unit === ingredient.unit) {
          grouped[cat][key].totalQty += parseQuantity(ingredient.quantity);
        } else {
          grouped[cat][key].unitMismatch = true;
        }
        grouped[cat][key].units.add(ingredient.unit);
      }
    });
  });
  return grouped;
}

export default function ShoppingListClient() {
  // Header with logo linking to main page
  // Always show 'Browse recipes' link at the top
  // (rest of component remains unchanged)

  const { shoppingCart, removeFromCart, clearCart } = useShoppingCart();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [removedIngredients, setRemovedIngredients] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const selectedRecipes = useMemo(() => {
    return shoppingCart
      .map((item) => recipesData.recipes.find((r: any) => r.id === item.recipeId))
      .filter(Boolean);
  }, [shoppingCart]);

  const groupedIngredients = useMemo(
    () => aggregateIngredients(selectedRecipes),
    [selectedRecipes]
  );

  function handleCheck(cat: string, key: string) {
    setCheckedItems((prev) => ({ ...prev, [cat + key]: !prev[cat + key] }));
  }

  // New function to handle ingredient removal
  function handleRemoveIngredient(category: string, ingredientKey: string) {
    setRemovedIngredients(prev => ({
      ...prev,
      [category + ingredientKey]: true,
    }));
  }

  function handleCopy() {
    let text = "Shopping List:\n";
    Object.entries(groupedIngredients).forEach(([cat, categoryItems]) => {
      const visibleIngredients = Object.entries(categoryItems)
        .filter(([key, item]) => !removedIngredients[cat + key]) // Filter out removed items
        .map(([key, item]) => item);

      if (visibleIngredients.length > 0) {
        text += `\n${cat}:\n`;
        visibleIngredients.forEach((item: any) => {
          text += `- ${item.totalQty} ${item.unit || ""} ${item.name}`;
          if (item.unitMismatch) text += ` (unit mismatch)`; // Plain text for clipboard
          text += "\n";
        });
      }
    });
    navigator.clipboard.writeText(text.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  // No early return for empty state here.
  // The <main> tag will always be rendered.

  return (
    <>
      <HeaderWithTransparency showNav={false} />
      <main className="max-w-2xl mx-auto px-4 pt-24 pb-12"> {/* This <main> tag is now always rendered */}
        {selectedRecipes.length === 0 ? (
          // Empty state content moved inside <main>
          <div className="text-center py-12">
            <h1 className="text-2xl font-semibold mb-4">Your Shopping List is Empty</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add some recipes to your cart to see your shopping list.
            </p>
            <Link href="/" className="px-6 py-2 rounded bg-culinairy-teal hover:bg-culinairy-cyan text-white">
              Browse Recipes
            </Link>
          </div>
        ) : (
          // Populated shopping list content
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Your Shopping List</h1>
              {selectedRecipes.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to clear your entire shopping list?")) {
                      clearCart(); // Clears the recipes from the cart
                      setCheckedItems({}); // Resets checked items state
                      setRemovedIngredients({}); // Resets individually removed ingredients state
                    }
                  }}
                  className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
                  aria-label="Clear entire shopping list"
                >
                  Clear All
                </button>
              )}
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
                ([key, item]) => !removedIngredients[cat + key]
              );

              if (visibleCategoryItems.length === 0) {
                return null;
              }

              return (
                <div key={cat} className="mb-8 p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">{cat}</h2>
                  <ul>
                    {visibleCategoryItems.map(([key, item]: [string, any]) => (
                      <li key={key} className="flex items-center justify-between mb-2 py-2 border-b border-gray-100 dark:border-gray-700/50 last:border-b-0">
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
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            {selectedRecipes.length > 0 && Object.values(groupedIngredients).every(catItems => Object.keys(catItems).length === 0 || Object.entries(catItems).every(([key,item])=> removedIngredients[key])) && (
               <div className="text-center py-10">
                 <p className="text-gray-600 dark:text-gray-400">All ingredients have been removed from the list.</p>
               </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
