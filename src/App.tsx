import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetails from './pages/RecipeDetails';
import SelectedRecipes from './pages/SelectedRecipes';
import { SelectedRecipesProvider } from './context/SelectedRecipesContext';

function App() {
  return (
    <SelectedRecipesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/selected" element={<SelectedRecipes />} />
        </Routes>
      </Router>
    </SelectedRecipesProvider>
  );
}

export default App;
