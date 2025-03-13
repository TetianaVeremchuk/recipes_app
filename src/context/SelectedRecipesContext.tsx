import { createContext, useContext, useState } from 'react';
import { Recipe } from '../services/api';

type SelectedRecipesContextType = {
  selectedRecipes: Recipe[];
  toggleRecipe: (recipe: Recipe) => void;
};

const SelectedRecipesContext = createContext<SelectedRecipesContextType | undefined>(undefined);

export const SelectedRecipesProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);

  const toggleRecipe = (recipe: Recipe) => {
    setSelectedRecipes((prevSelected) =>
      prevSelected.some((r) => r.idMeal === recipe.idMeal)
        ? prevSelected.filter((r) => r.idMeal !== recipe.idMeal)
        : [...prevSelected, recipe] 
    );
  };

  return (
    <SelectedRecipesContext.Provider value={{ selectedRecipes, toggleRecipe }}>
      {children}
    </SelectedRecipesContext.Provider>
  );
};

export const useSelectedRecipes = () => {
  const context = useContext(SelectedRecipesContext);
  if (!context) throw new Error("useSelectedRecipes must be used within a SelectedRecipesProvider");
  return context;
};
