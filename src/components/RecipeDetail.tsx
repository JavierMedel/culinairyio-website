import Image from 'next/image';
import { Recipe, Ingredient, Step } from '../../types/Recipe';

export function RecipeDetail({ recipe }: { recipe: Recipe }) {
  return (
    <div className="recipe-detail">
      <div className="recipe-header">
        {recipe.image_url && (
          <Image
            src={recipe.image_url}
            alt={recipe.title}
            width={1200}
            height={800}
            className="recipe-main-image"
          />
        )}
        {/* ... rest of the header ... */}
      </div>

      {/* ... other sections ... */}

      <section className="ingredients-section">
        <h3>Ingredients</h3>
        <div className="ingredients-grid">
          {recipe.ingredients.map((ingredient: Ingredient) => (
            <div key={ingredient.name} className="ingredient-card">
              {ingredient.image_url && (
                <Image
                  src={ingredient.image_url}
                  alt={ingredient.name}
                  width={100}
                  height={100}
                />
              )}
              {/* ... rest of ingredient card ... */}
            </div>
          ))}
        </div>
      </section>

      {/* ... other sections ... */}

      <section className="cooking-steps">
        <h3>Instructions</h3>
        {recipe.cooking_steps.map((step: Step) => (
          <div key={step.step} className="step-card">
            <div className="step-number">Step {step.step}</div>
            {step.image_url && (
              <Image
                src={step.image_url}
                alt={`Step ${step.step}`}
                width={750}
                height={500}
              />
            )}
            <p>{step.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
