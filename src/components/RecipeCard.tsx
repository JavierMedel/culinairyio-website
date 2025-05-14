import Image from 'next/image';
import { Recipe } from '../../types/Recipe'; // Adjust relative path

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="recipe-card">
      {recipe.image_url && (
        <Image
          src={recipe.image_url}
          alt={recipe.title}
          width={300}
          height={200}
        />
      )}
      <div className="recipe-info">
        <h2>{recipe.title || 'Recipe Title'}</h2>
        {recipe.subtitle && <h3>{recipe.subtitle}</h3>}
        <p>{recipe.description || 'No description available.'}</p>
        <div className="recipe-meta">
          {recipe.prep_time && <span>Prep: {recipe.prep_time}</span>}
          {recipe.cooking_time && <span>Cook: {recipe.cooking_time}</span>}
          {recipe.calories_per_serving && <span>Calories: {recipe.calories_per_serving}</span>}
          {recipe.difficulty && <span>Difficulty: {recipe.difficulty}</span>}
        </div>
      </div>
    </div>
  )
}
