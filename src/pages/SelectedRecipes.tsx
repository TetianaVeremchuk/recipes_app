import { useSelectedRecipes } from '../context/SelectedRecipesContext';
import RecipeCard from '../components/RecipeCard';

const SelectedRecipes = () => {
  const { selectedRecipes } = useSelectedRecipes();

  const combinedIngredients: Record<string, string[]> = {};

  selectedRecipes.forEach(recipe => {
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof typeof recipe] as string | null;
      const measure = recipe[`strMeasure${i}` as keyof typeof recipe] as string | null;

      if (ingredient && ingredient.trim() !== "") {
        if (!combinedIngredients[ingredient]) {
          combinedIngredients[ingredient] = [];
        }
        combinedIngredients[ingredient].push(measure?.trim() || "to taste");
      }
    }
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Selected Recipes</h1>

      {selectedRecipes.length === 0 ? (
        <p className="text-gray-500 text-center">No recipes selected.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {selectedRecipes.map(recipe => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>

          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <h2 className="text-xl font-semibold mb-2">Combined Ingredients</h2>
            <ul className="list-disc list-inside">
              {Object.entries(combinedIngredients).map(([ingredient, measures]) => (
                <li key={ingredient} className="text-gray-700">
                  {ingredient}: {measures.join(', ')}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Cooking Instructions</h2>
            {selectedRecipes.map(recipe => (
              <div key={recipe.idMeal} className="mb-4">
                <h3 className="text-lg font-semibold">{recipe.strMeal}</h3>
                <p className="text-gray-700 whitespace-pre-line">{recipe.strInstructions}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SelectedRecipes;
