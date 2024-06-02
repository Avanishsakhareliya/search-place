// components/SearchBox.js
import React, { useState } from 'react';

const SearchBox = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-box">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search city..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>Search</button>
      </form>
    </div>
  );
};

export default SearchBox;
