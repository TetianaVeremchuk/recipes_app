const CategoryFilter = ({ selectedCategory, onCategoryChange }: { selectedCategory: string, onCategoryChange: (category: string) => void }) => {
  const categories = ["All", "Beef", "Chicken", "Dessert", "Pasta", "Seafood", "Vegan", "Vegetarian"];

  return (
    <div className="mb-6 flex justify-center">
      <select
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category === "All" ? "" : category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
