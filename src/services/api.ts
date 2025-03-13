import axios from 'axios';

const API_URL = 'https://www.themealdb.com/api/json/v1/1';

export type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube: string;
  [key: string]: string | null;
};

export type Category = {
  strCategory: string;
};

export const fetchAllRecipes = async (): Promise<Recipe[]> => {
  const { data } = await axios.get<{ meals: Recipe[] }>(`${API_URL}/search.php?s=`);
  return data.meals || [];
};

export const fetchRecipeById = async (id: string): Promise<Recipe> => {
  const { data } = await axios.get<{ meals: Recipe[] }>(`${API_URL}/lookup.php?i=${id}`);
  return data.meals[0];
};

export const searchRecipes = async (query: string): Promise<Recipe[]> => {
  const { data } = await axios.get<{ meals: Recipe[] }>(`${API_URL}/search.php?s=${query}`);
  return data.meals || [];
};

export const fetchCategories = async (): Promise<string[]> => {
  const { data } = await axios.get<{ categories: Category[] }>(`${API_URL}/categories.php`);
  return data.categories.map((category) => category.strCategory);
};
