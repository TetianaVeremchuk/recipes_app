import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetails from './pages/RecipeDetails';
import SelectedRecipes from './pages/SelectedRecipes';
import { SelectedRecipesProvider } from './context/SelectedRecipesContext';

function App() {
  return (
    <SelectedRecipesProvider>
      <Router>
        <div className="container mx-auto p-6">
          <nav className="flex justify-between items-center bg-white shadow-md p-4 mb-6 rounded-lg">
            <Link to="/" className="text-xl font-bold text-blue-500 hover:text-blue-700">Recipes</Link>
            <Link to="/selected" className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
              Selected Recipes
            </Link>
          </nav>

          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/selected" element={<SelectedRecipes />} />
          </Routes>
        </div>
      </Router>
    </SelectedRecipesProvider>
  );
}

export default App;
