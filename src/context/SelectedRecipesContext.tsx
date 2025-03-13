import { createContext, useContext, useState, ReactNode } from 'react';
import { Recipe } from '../services/api';

type SelectedRecipesContextType = {
  selectedRecipes: Recipe[];
  toggleRecipe: (recipe: Recipe) => void;
};

const SelectedRecipesContext = createContext<SelectedRecipesContextType | undefined>(undefined);

export const SelectedRecipesProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);

  const toggleRecipe = (recipe: Recipe) => {
    setSelectedRecipes((prev) =>
      prev.find((r) => r.idMeal === recipe.idMeal)
        ? prev.filter((r) => r.idMeal !== recipe.idMeal)
        : [...prev, recipe]
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
  if (!context) throw new Error('useSelectedRecipes must be used within a SelectedRecipesProvider');
  return context;
};
