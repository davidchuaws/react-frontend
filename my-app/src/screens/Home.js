import React, { useState, useEffect } from 'react';
import '../App.css';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isProviderDetailsOpen, setProviderDetailsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [providerDetails, setProviderDetails] = useState({title: "", logo: "", description: "", swagger: "", email: "", name: "", url: ""});

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleProviderDetails = (provider) => {
    setProviderDetailsOpen(!isProviderDetailsOpen);
    setSelectedProvider(provider);
    getProviderDetails(provider);
  };
  useEffect(() => {
    fetchProviders();
  }, []);

  function getProviderDetails(provider) {
    fetch(`https://api.apis.guru/v2/${provider}.json`)
    .then((response) => response.json())
    .then((data) => {
      var tmp = Object.keys(data['apis'])[0];
      setProviderDetails({
          title: data['apis'][tmp]['info']['title'],
          logo: data['apis'][tmp]['info']['x-logo']['url'],
          description: data['apis'][tmp]['info']['description'],
          swagger: data['apis'][tmp]['swaggerUrl'],
          email: data['apis'][tmp]['info']['contact']['email'],
          name: data['apis'][tmp]['info']['contact']['name'],
          url: data['apis'][tmp]['info']['contact']['url']
      })
    }).catch((error) => {
      console.error('Error fetching provider details:', error);
    });
  }

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

  const handleBackClick = () => {
    setSelectedProvider(null);
    setProviderDetailsOpen(!isProviderDetailsOpen);
  };

  return (
    <div className="App">
      <header className="App-header">
      {!isProviderDetailsOpen && (
        <button className="App-button" onClick={toggleSidebar}>Explore web APIs</button>
      )}
      {isProviderDetailsOpen && isDropdownOpen ? (
         <ProviderDetails provider={selectedProvider} onBackClick={handleBackClick} providerDetails={providerDetails}/>
      ) : isSidebarOpen && (
        <div>
          <Sidebar providers={providers} toggleProviderDetails={toggleProviderDetails} toggleDropdown={toggleDropdown}/>
        </div>
      )}
      </header>
    </div>
  );
};

const ProviderDetails = ({ provider, onBackClick, providerDetails }) => {
  return (
    <div className="ProviderDetails">
      <span>
        <h2>{providerDetails['title']}</h2>
        <img src={providerDetails["logo"]} alt={provider} />
      </span>
      <h3>Description</h3>
      <p>{providerDetails["description"]}</p>
      <h3>Swagger</h3>
      <p>{providerDetails["swagger"]}</p>
      <h3>Contact</h3>
      <p>Email  {providerDetails["email"]}</p>
      <p>Name   {providerDetails["name"]}</p>
      <p>Url   {providerDetails["url"]}</p>
      <button onClick={onBackClick}>Explore more APIs</button>
    </div>
  );
};

const Sidebar = ({ toggleProviderDetails, providers, toggleDropdown }) => {
  const [details, setDetails] = useState({title: "", logo: ""});
  const [selectedProvider, setSelectedProvider] = useState(null);

  const handleProviderClick = (provider) => {
    setSelectedProvider(provider);
    getProviderDetails(provider);
    toggleDropdown()
  };
  
  function getProviderDetails(provider) {
    fetch(`https://api.apis.guru/v2/${provider}.json`)
    .then((response) => response.json())
    .then((data) => {
      var tmp = Object.keys(data['apis'])[0];
      setDetails({
          title: data['apis'][tmp]['info']['title'],
          logo: data['apis'][tmp]['info']['x-logo']['url']
      })
    }).catch((error) => {
      console.error('Error fetching provider details:', error);
    });
  }

  return (
    <div className="Sidebar">
      <h3>Select Provider</h3>
      <ul>
        {providers.map((provider) => (
          <li key={provider} >
              {provider}
              <span className='DownArrow' onClick={() => handleProviderClick(provider)}></span>
              {toggleDropdown && selectedProvider === provider && (
                <Dropdown selectedProvider={selectedProvider} details={details} toggleProviderDetails={toggleProviderDetails}/>
              )}
          </li>
              
        ))}

      </ul>
    </div>
  );
};

const Dropdown = ({ toggleProviderDetails, selectedProvider, details }) => {
  return (
    <div className="Dropdown">
      <p className='DropdownDetails'>
        <img src={details["logo"]} alt={selectedProvider} />
        <button onClick={() => toggleProviderDetails(selectedProvider)}>
          {details['title']}
        </button>
      </p>
    </div>
  );
};

export default Home;
