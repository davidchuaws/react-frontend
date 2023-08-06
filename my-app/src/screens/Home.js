import React, { useState, useEffect } from 'react';
import '../App.css';
// import ProviderDetails from '../components/ProviderDetails';
// import Sidebar from '../components/Sidebar';

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

  const handleBackClick = () => {
    setSelectedProvider(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button className="App-button" onClick={toggleSidebar}>Explore web APIs</button>
      </header>
      {selectedProvider ? (
         <ProviderDetails provider={selectedProvider} onBackClick={handleBackClick} />
      ) : isSidebarOpen && (
        <Sidebar providers={providers}/>
      )}
    </div>
  );
};

const ProviderDetails = ({ provider, onBackClick }) => {
  const [details, setDetails] = useState({title: "", logo: ""});

  useEffect(() => {
    fetchProviderDetails();
  }, [provider]);

  const fetchProviderDetails = () => {
    // Make API call to https://api.apis.guru/v2/${provider}.json to get provider details
    fetch(`https://api.apis.guru/v2/${provider}.json`)
      .then((response) => response.json())
      .then((data) => {

        console.log(data['apis']);
        function changeDetails() {
            setDetails({
                title: data['apis'][provider]['info']['title'],
                logo: data['apis'][provider]['info']['x-logo']['url']
            }) 
            console.log(data['apis'][provider]['info']['title'])
        };
        changeDetails()
      })
      .catch((error) => {
        console.error('Error fetching provider details:', error);
      });
  };

  return (
    <div className="ProviderDetails">
      <span>
        <h2>{details['title']}</h2>
        <img src={details["logo"]} alt={provider} />
      </span>
      <h3>Description</h3>
      <p>Insert description</p>
      <h3>Swagger</h3>
      <p>Insert url</p>
      <h3>Contact</h3>
      <p>Email</p>
      <p>Name</p>
      <p>Url</p>
      <button onClick={onBackClick}>Explore more APIs</button>
    </div>
  );
};

const Sidebar = ({ providers }) => {
  const [details, setDetails] = useState({title: "", logo: ""});
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProviderClick = (provider) => {
    setSelectedProvider(provider);
    console.log(selectedProvider);
    getProviderDetails(provider);
    toggleDropdown();
  };
  
  function getProviderDetails(provider) {
    fetch(`https://api.apis.guru/v2/${provider}.json`)
    .then((response) => response.json())
    .then((data) => {
      var tmp = Object.keys(data['apis'])[0];
      // console.log(tmp)
      console.log(data['apis'][tmp]['info']['title'])
      console.log(data['apis'][tmp]['info']['x-logo']['url'])
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
          <li key={provider} onClick={() => handleProviderClick(provider)}>
              {provider}
              <span className='DownArrow'></span>
              {isDropdownOpen && selectedProvider === provider && (
                <Dropdown selectedProvider={selectedProvider} details={details} />
              )}
          </li>
              
        ))}

      </ul>
    </div>
  );
};

const Dropdown = ({ selectedProvider, details }) => {
  const [isProviderDetailsOpen, setProviderDetailsOpen] = useState(false);
  const toggleProviderDetails = () => {
    setProviderDetailsOpen(!isProviderDetailsOpen);
  };

  return (
    <div className="Dropdown">
      {isProviderDetailsOpen ? (
        <ProviderDetails provider={selectedProvider}/>
      ) : (
      <p className='DropdownDetails'>
        <img src={details["logo"]} alt={selectedProvider} />
        <button onClick={toggleProviderDetails}>
          {details['title']}
        </button>
      </p>
    )
    }

    </div>
  );
};

export default Home;
