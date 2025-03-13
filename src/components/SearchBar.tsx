import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      onSearch(query);
    }, 500);

    debouncedSearch();
    return () => debouncedSearch.cancel();
  }, [query, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        className="border border-gray-300 rounded-md p-2 w-full max-w-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search for a recipe..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
