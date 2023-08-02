import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import ProviderDetails from '../components/ProviderDetails';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = () => {
    fetch('https://api.apis.guru/v2/providers.json')
      .then((response) => response.json())
      .then((data) => {
        setProviders(data['data']);
      })
      .catch((error) => {
        console.error('Error fetching providers:', error);
      });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleProviderClick = (provider) => {
    setSelectedProvider(provider);
  };

  const handleBackClick = () => {
    setSelectedProvider(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={toggleSidebar}>Explore web APIs</button>
      </header>
      {selectedProvider ? (
         <ProviderDetails provider={selectedProvider} onBackClick={handleBackClick} />
      ) : isSidebarOpen && (
        <Sidebar providers={providers} onProviderClick={handleProviderClick}/>
      )}
    </div>
  );
};

export default Home;
