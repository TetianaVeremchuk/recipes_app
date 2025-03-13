import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchRecipeById, Recipe } from '../services/api';

const RecipeDetails = () => {
  const { id } = useParams();
  const { data: recipe, isLoading, error } = useQuery<Recipe>({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipeById(id!),
  });

  if (isLoading) return <div className="text-center text-lg">Loading...</div>;
  if (error || !recipe) return <div className="text-red-500 text-center">Recipe not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <img className="w-full rounded-md mb-4" src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h1 className="text-3xl font-bold mb-2">{recipe.strMeal}</h1>
      <p className="text-gray-500 mb-4">{recipe.strCategory} • {recipe.strArea}</p>
      <h2 className="text-xl font-semibold mb-2">Instructions</h2>
      <p className="text-gray-700 leading-relaxed">{recipe.strInstructions}</p>
      {recipe.strYoutube && (
        <div className="mt-4">
          <a 
            href={recipe.strYoutube} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 underline hover:text-blue-700"
          >
            Watch on YouTube
          </a>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
