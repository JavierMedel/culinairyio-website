import Image from 'next/image';
import type { ImageProps } from 'next/image';
// Correct the import path assuming components/ is at the root or src/components/
import { Recipe, Ingredient, Step, NutritionValues } from '../types/Recipe'; 

export function RecipeDetail({ recipe }: { recipe: Recipe }) {
  // Check if recipe and nested properties exist before accessing them
  if (!recipe) {
    return <div>Recipe data is missing.</div>;
  }

  return (
    <div className="recipe-detail">
      <div className="recipe-header">
        <Image
          src={recipe.image_url}
          alt={recipe.title}
          width={1200}
          height={800}
          className="recipe-main-image"
        />
        <div className="recipe-header-info">
          <div className="tags">
            {/* Add optional chaining and type for tags */}
            {recipe.tags?.map((tag: string) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <h1>{recipe.title || 'Recipe Title Missing'}</h1>
          {recipe.subtitle && <h2>{recipe.subtitle}</h2>}
          {recipe.cousine && <p className="cuisine">{recipe.cousine} Cuisine</p>}
          <p className="description">{recipe.description || 'Description missing.'}</p>
        </div>
      </div>

      {/* Meta section - check if properties exist */}
      <div className="recipe-meta">
        <div className="time-info">
          {recipe.prep_time && <span>Prep: {recipe.prep_time}</span>}
          {recipe.cooking_time && <span>Cook: {recipe.cooking_time}</span>}
          {recipe.total_time && <span>Total: {recipe.total_time}</span>}
        </div>
        <div className="serving-info">
          {recipe.servings && <span>Servings: {recipe.servings}</span>}
          {recipe.difficulty && <span>Difficulty: {recipe.difficulty}</span>}
        </div>
      </div>

      <div className="recipe-content">
        {/* Ingredients section - check if ingredients array exists */}
        <section className="ingredients-section">
          <h3>Ingredients</h3>
          <div className="ingredients-grid">
            {/* Add type for ingredient */}
            {recipe.ingredients?.map((ingredient: Ingredient) => (
              <div key={ingredient.name} className="ingredient-card">
                {ingredient.image_url && <Image
                  src={ingredient.image_url}
                  alt={ingredient.name}
                  width={100}
                  height={100}
                />}
                <h4>{ingredient.name || 'Ingredient Name Missing'}</h4>
                <p>{ingredient.quantity || 'Quantity Missing'}</p>
                {ingredient.allergens && ingredient.allergens.length > 0 && (
                  <div className="allergens">
                    <small>Contains: {ingredient.allergens.join(', ')}</small>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Not Included section - check if array exists */}
        {recipe.not_included_in_delivery && recipe.not_included_in_delivery.length > 0 && (
          <section className="not-included-section">
            <h3>You'll Need</h3>
            <div className="not-included-grid">
              {/* Corrected map function and Image component */}
              {recipe.not_included_in_delivery.map((item: Ingredient) => (
                <div key={item.name} className="not-included-item">
                  {item.image_url && (
                    <Image
                      src={item.image_url}
                      alt={item.name || 'Item image'} // Add alt text
                      width={50}
                      height={50}
                    />
                  )}
                  <span>{item.name || 'Item Name Missing'}</span>
                  <span>{item.quantity || ''}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Cooking Steps section - check if array exists */}
        <section className="cooking-steps">
          <h3>Instructions</h3>
          {/* Add type annotation for step parameter */}
          {recipe.cooking_steps?.map((step: Step) => (
            <div key={step.step} className="step-card">
              <div className="step-number">Step {step.step}</div>
              {step.image_url && <Image
                src={step.image_url}
                alt={`Step ${step.step}`}
                width={750}

                height={500}
              />}
              <p>{step.description || 'Instruction missing.'}</p>
            </div>
          ))}
        </section>

        {/* Nutrition section - check if object and nested object exist */}
        {/* Add optional chaining */}
        {recipe.nutrition_values?.per_serving && (
          <section className="nutrition-section">
            <h3>Nutrition Values (per serving)</h3>
            <div className="nutrition-grid">
              {/* Explicitly return null when value is falsy */}
              {Object.entries(recipe.nutrition_values.per_serving).map(([key, value]) => (
                value ? (
                  <div key={key} className="nutrition-item">
                    <span className="nutrition-label">{key.replace(/_/g, ' ')}</span>
                    <span className="nutrition-value">{value}</span>
                  </div>
                ) : null
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
// Removed duplicated closing tags below this line
