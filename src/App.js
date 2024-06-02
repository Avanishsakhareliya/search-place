// App.js
import React, { useState } from 'react';
import './App.css';
import SearchBox from './SearchBox';
import Table from './Table';
import axios from 'axios';


function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
        params: { countryIds: 'IN', namePrefix: query, limit: '10' },
        headers: {
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
          'x-rapidapi-key': '9a133b2ec4msh217858f2c1bd97ap1350cfjsn24b4357b9ea9'
        }
      });
      setSearchResults(response.data.data);


    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    handleSearch(''); // Pass an empty string or any default query
  }, []);
  
  return (
    <div className="App">
      <SearchBox onSearch={handleSearch} loading={loading} />
      <Table data={searchResults} loading={loading} />
    </div>
  );
}

export default App;
