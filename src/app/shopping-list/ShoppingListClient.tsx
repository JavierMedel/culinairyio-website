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

  function handleCopy() {
    let text = "Shopping List:\n";
    Object.entries(groupedIngredients).forEach(([cat, items]) => {
      text += `\n${cat}:\n`;
      Object.values(items).forEach((item: any) => {
        text += `- ${item.totalQty} ${item.unit || ""} ${item.name}`;
        if (item.unitMismatch) text += ` <span className="text-xs text-red-500 ml-2">(unit mismatch)</span>`;
        text += "\n";
      });
    });
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (selectedRecipes.length === 0) {
    return (
      <>
        <HeaderWithTransparency showNav={false} />
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Your Shopping List is Empty</h1>
          <p className="mb-4">Add recipes to your shopping list to see ingredients here.</p>
          <Link href="/" className="text-culinairy-teal underline">Browse Recipes</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderWithTransparency showNav={false} />
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="flex justify-end mb-6">
          <Link href="/" className="text-culinairy-teal underline font-semibold">Browse Recipes</Link>
        </div>
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping List</h1>
      <button
        className="mb-4 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
        onClick={clearCart}
      >
        Clear List
      </button>
      <button
        className="mb-4 ml-2 px-4 py-2 rounded bg-culinairy-teal hover:bg-culinairy-cyan text-white"
        onClick={handleCopy}
        aria-label="Copy shopping list to clipboard"
      >
        {copied ? "Copied!" : "Copy to Clipboard"}
      </button>
      {Object.entries(groupedIngredients).map(([cat, items]) => (
        <div key={cat} className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{cat}</h2>
          <ul>
            {Object.entries(items).map(([key, item]: [string, any]) => (
              <li key={key} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  aria-label={`Mark ${item.name} as purchased`}
                  checked={!!checkedItems[cat + key]}
                  onChange={() => handleCheck(cat, key)}
                  className="mr-2"
                />
                <span className={checkedItems[cat + key] ? "line-through text-gray-400" : ""}>
  {item.totalQty} {item.unit || ""} {item.name}
  {item.unitMismatch && (
    <span className="text-xs text-red-500 ml-2">(unit mismatch)</span>
  )}
</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-2">Recipes in List</h2>
        <ul>
          {selectedRecipes.map((recipe: any) => (
            <li key={recipe.id} className="flex items-center justify-between mb-2">
              <span>{recipe.title}</span>
              <button
                className="ml-2 px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-xs"
                onClick={() => removeFromCart(recipe.id)}
                aria-label={`Remove ${recipe.title} from shopping list`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  </>
  );
}
