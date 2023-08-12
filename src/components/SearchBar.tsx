import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch(''); // Trigger a search with an empty query to show all movies
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && ( // Show the "x" button only when there's a search query
        <button className="clear-button" onClick={handleClear}>
          x
        </button>
      )}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
