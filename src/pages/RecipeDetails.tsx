import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchRecipeById} from '../services/api';

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: recipe, isLoading, error } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipeById(id!),
    enabled: !!id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error || !recipe) return <div>Error loading recipe.</div>;

  return (
    <div className="recipe-details">
      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <p><strong>Category:</strong> {recipe.strCategory}</p>
      <p><strong>Area:</strong> {recipe.strArea}</p>
      <p><strong>Instructions:</strong></p>
      <p>{recipe.strInstructions}</p>
      {recipe.strYoutube && (
        <div>
          <p><strong>Watch on YouTube:</strong></p>
          <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">Click here</a>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
