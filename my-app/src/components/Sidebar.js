import React, { useRef, useState } from "react";
import "./Sidebar.css";
import useClickOutside from "./useClickOutside";

const Sidebar = ({ providers, onProviderClick }) => {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const dropdownRef = useRef(null);

  const handleProviderClick = (provider) => {
    setSelectedProvider(selectedProvider === provider ? null : provider);
    // console.log("Selected provider home: " + provider)
  };
  useClickOutside(dropdownRef, () => {
    setSelectedProvider(null);
  });

  return (
    <div className="Sidebar">
      <h3>Select Provider</h3>
      <ul>
        {providers.map((provider) => (
          <li key={provider}>
            <button onClick={() => handleProviderClick(provider)}>
              {provider}
            </button>
            {selectedProvider === provider && (
              <Dropdown provider={provider}/>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Dropdown = ({ provider }) => {
  const [details, setDetails] = useState({title: "", logo: ""});


  fetch(`https://api.apis.guru/v2/${provider}.json`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data['apis']);
    function changeDetails (event) {
      // console.log(Object.keys(data['apis']))
      var tmp = Object.keys(data['apis'])[0];
      // console.log(tmp)
      console.log(data['apis'][tmp]['info']['title'])
      console.log(data['apis'][tmp]['info']['x-logo']['url'])
      setDetails({
          title: data['apis'][tmp]['info']['title'],
          logo: data['apis'][tmp]['info']['x-logo']['url']
      }) 
  };
  changeDetails()
  })
  .catch((error) => {
    console.error('Error fetching provider details:', error);
  });

  return (
    <div className="Dropdown">
      <img src={details["logo"]} alt={provider} />
      <p>{details['title']}</p>
    </div>
  );
};

export default Sidebar;
