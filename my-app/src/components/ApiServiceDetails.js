import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiServiceDetails = ({ provider }) => {
  const [apis, setApis] = useState([]);

  useEffect(() => {
    // Fetch list of web APIs for the selected provider from the API
    axios.get(`https://api.apis.guru/v2/${provider}.json`)
      .then(response => {
        setApis(Object.keys(response.data.paths));
      })
      .catch(error => {
        console.error('Error fetching APIs:', error);
      });
  }, [provider]);

  return (
    <div className="api-service-details">
      <h2>API Service Details</h2>
      <h3>Provider: {provider}</h3>
      <ul>
        {apis.map(api => (
          <li key={api}>{api}</li>
        ))}
      </ul>
    </div>
  );
};

export default ApiServiceDetails;
