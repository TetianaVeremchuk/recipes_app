import { Link } from 'react-router-dom';
import { useSelectedRecipes } from '../context/SelectedRecipesContext';
import { Recipe } from '../services/api';

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { selectedRecipes, toggleRecipe } = useSelectedRecipes();
  const isSelected = selectedRecipes.some((r) => r.idMeal === recipe.idMeal);

  return (
    <div className="recipe-card">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => toggleRecipe(recipe)}
      />
      <Link to={`/recipe/${recipe.idMeal}`}>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <h3>{recipe.strMeal}</h3>
        <p>{recipe.strCategory}</p>
        <p>{recipe.strArea}</p>
      </Link>
    </div>
  );
};

export default RecipeCard;
