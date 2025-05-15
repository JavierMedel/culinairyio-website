// Add Ingredient interface based on usage
export interface Ingredient {
  name: string;
  quantity: number | string;
  unit?: string;
  category?: string;
  allergens?: string[];
  image_url: string;
}

export interface NutritionValues {
  calories?: string; // Make optional based on previous usage
  fat?: string; // Make optional
  saturated_fat: string;
  carbohydrate: string;
  sugar: string;
  dietary_fiber: string;
  protein: string;
  cholesterol: string;
  sodium: string;
  potassium: string;
  calcium: string;
  iron?: string; // Make optional
}

// Rename to Step to match usage in RecipeDetail.tsx
export interface Step {
  step: number;
  description: string;
  image_url?: string; // Make optional
}

// NotIncludedItem seems similar to Ingredient, maybe consolidate or keep separate if needed
export interface NotIncludedItem {
  name: string;
  quantity: string;
  image_url: string;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle?: string; // Make optional
  description: string;
  prep_time?: string; // Make optional
  cooking_time?: string; // Make optional
  total_time?: string; // Make optional
  servings?: string; // Make optional
  difficulty?: string; // Make optional
  serving_size?: string; // Make optional
  calories_per_serving?: string; // Make optional
  dietary_info?: {
    allergens?: string[];
    may_contain?: string[];
  } | string;
  ingredients: Ingredient[];
  not_included_in_delivery?: NotIncludedItem[]; // Make optional
  cooking_steps: Step[]; // Use Step type
  nutrition_values?: { // Make optional
    per_serving?: NutritionValues; // Make optional
  };
  tags?: string[]; // Make optional
  image_url: string;
  cousine?: string; // Make optional
  pdf_url?: string; // Add optional pdf_url based on previous usage
}
