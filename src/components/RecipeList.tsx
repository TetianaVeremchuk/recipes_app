import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import CategoryFilter from './CategoryFilter';
import { fetchAllRecipes, searchRecipes } from '../services/api';

const ITEMS_PER_PAGE = 6;

const RecipeList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: recipes, isLoading, error } = useQuery({
    queryKey: ['recipes', searchQuery],
    queryFn: () => (searchQuery ? searchRecipes(searchQuery) : fetchAllRecipes()),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recipes.</div>;

  const filteredRecipes = selectedCategory
    ? recipes?.filter((recipe) => recipe.strCategory === selectedCategory)
    : recipes;

  const totalPages = Math.ceil((filteredRecipes?.length || 0) / ITEMS_PER_PAGE);
  const paginatedRecipes = filteredRecipes?.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="recipe-list">
      <SearchBar onSearch={(query) => { setSearchQuery(query); setCurrentPage(1); }} />
      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={(category) => { setSelectedCategory(category); setCurrentPage(1); }} />

      <div className="selected-recipes-link">
        <Link to="/selected">Go to Selected Recipes</Link>
      </div>

      {paginatedRecipes?.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
};

export default RecipeList;
