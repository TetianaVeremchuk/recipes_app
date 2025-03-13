import { useSelectedRecipes } from '../context/SelectedRecipesContext';

const SelectedRecipes = () => {
  const { selectedRecipes } = useSelectedRecipes();

  const combinedIngredients = selectedRecipes.reduce((acc, recipe) => {
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof typeof recipe];
      const measure = recipe[`strMeasure${i}` as keyof typeof recipe];

      if (ingredient && ingredient.trim()) {
        const key = `${ingredient} (${measure || ''})`;
        acc[key] = (acc[key] || 0) + 1;
      }
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="selected-recipes">
      <h2>Selected Recipes</h2>
      {selectedRecipes.length === 0 ? (
        <p>No recipes selected.</p>
      ) : (
        <>
          <h3>Ingredients List</h3>
          <ul>
            {Object.entries(combinedIngredients).map(([ingredient, count]) => (
              <li key={ingredient}>
                {ingredient} {count > 1 && `(x${count})`}
              </li>
            ))}
          </ul>
          <h3>Selected Recipes</h3>
          {selectedRecipes.map((recipe) => (
            <div key={recipe.idMeal} className="selected-recipe">
              <h4>{recipe.strMeal}</h4>
              <p>{recipe.strCategory} - {recipe.strArea}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SelectedRecipes;
