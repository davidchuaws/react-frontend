import React from 'react';
import ApiServiceDetails from '../components/ApiServiceDetails';

const ApiServiceDetailsScreen = ({ provider }) => {
  return (
    <div className="api-service-details-screen">
      <ApiServiceDetails provider={provider} />
    </div>
  );
};

export default ApiServiceDetailsScreen;
