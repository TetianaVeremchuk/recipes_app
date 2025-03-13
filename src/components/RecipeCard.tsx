import { Link } from 'react-router-dom';
import { Recipe } from '../services/api';
import { useSelectedRecipes } from '../context/SelectedRecipesContext';

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { selectedRecipes, toggleRecipe } = useSelectedRecipes();
  const isSelected = selectedRecipes.some((r) => r.idMeal === recipe.idMeal);

  return (
    <div className={`relative bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow p-4 border ${isSelected ? 'border-blue-500' : 'border-transparent'}`}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => toggleRecipe(recipe)}
        className="absolute top-2 right-2 w-5 h-5 text-blue-600"
      />

      <Link to={`/recipe/${recipe.idMeal}`}>
        <img className="w-full h-40 object-cover rounded-md" src={recipe.strMealThumb} alt={recipe.strMeal} />
        <h3 className="text-lg font-bold mt-2">{recipe.strMeal}</h3>
        <p className="text-gray-500 text-sm">{recipe.strCategory} • {recipe.strArea}</p>
      </Link>
    </div>
  );
};

export default RecipeCard;
