import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import CategoryFilter from './CategoryFilter';
import { fetchAllRecipes, searchRecipes, Recipe } from '../services/api';

const ITEMS_PER_PAGE = 6;

const RecipeList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: recipes, isLoading, error } = useQuery({
    queryKey: ['recipes', searchQuery],
    queryFn: () => (searchQuery ? searchRecipes(searchQuery) : fetchAllRecipes()),
  });

  if (isLoading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error loading recipes.</div>;

  const filteredRecipes = selectedCategory
    ? recipes?.filter((recipe: Recipe) => recipe.strCategory === selectedCategory)
    : recipes;

  const totalPages = Math.ceil((filteredRecipes?.length || 0) / ITEMS_PER_PAGE);
  const paginatedRecipes = filteredRecipes?.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto p-6">
      <SearchBar onSearch={(query) => { setSearchQuery(query); setCurrentPage(1); }} />
      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={(category) => { setSelectedCategory(category); setCurrentPage(1); }} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {paginatedRecipes?.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  );
};

export default RecipeList;
