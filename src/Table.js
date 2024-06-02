import React, { useState, useEffect } from 'react';

const Table = ({ data, loading }) => {
  const getCountryFlagUrl = (countryCode) => {
    return `https://flagsapi.com/${countryCode}/flat/24.png`;
  };

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [citiesPerPage, setCitiesPerPage] = useState(5);

  // Pagination logic
  const indexOfLastCity = currentPage * citiesPerPage;
  const indexOfFirstCity = indexOfLastCity - citiesPerPage;
  const currentCities = data.slice(indexOfFirstCity, indexOfLastCity);

  // Update pagination numbers based on search result
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>
                <span className="loader"></span>
              </td>
            </tr>
          )}
          {!loading && currentCities.length > 0 ? (
            currentCities.map((item, index) => (
              <tr key={index}>
                <td>{indexOfFirstCity + index + 1}</td>
                <td>{item.city}</td>
                <td>
                  <div className='country_Name_flag'>
                    <div>{item.country}</div>
                    <div style={{marginLeft:"10px"}}>
                      <img src={getCountryFlagUrl(item.countryCode)} alt={`${item.country} flag`} />
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : null}
          {!loading && currentCities.length === 0 && (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>No result found</td>
            </tr>
          )}
        </tbody>
      </table>
      
      {!loading && data.length > citiesPerPage && currentCities.length > 0 && (
        <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          <span>
            {Array.from({ length: Math.ceil(data.length / citiesPerPage) }, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => paginate(page)} className={currentPage === page ? 'active' : ''}>
                {page}
              </button>
            ))}
          </span>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(data.length / citiesPerPage)}>Next</button>
        </div>
      )}

      <div className="user-input">
        <label htmlFor="citiesPerPage">Cities per page: </label>
        <input 
          type="number" 
          className="citiesPerPage_input" 
          value={citiesPerPage} 
        onChange={(e) => {
            const value = e.target.value;
            if (value === '' || (value >= 5 && value <= 10)) {
              setCitiesPerPage(parseInt(value));
            }
          }} 
        />
        {isNaN(citiesPerPage) && <span className="validation-text"> Minimum value should be 5</span>}
      </div>
    </div>
  );
};

export default Table;