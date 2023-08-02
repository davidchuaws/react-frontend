import React, { useRef, useState } from "react";
import "./Sidebar.css";
import useClickOutside from "./useClickOutside";

const Sidebar = ({ providers, onProviderClick }) => {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleProviderClick = (provider) => {
    setSelectedProvider(provider);
    setShowDropdown(false);
    onProviderClick(provider);
  };
  useClickOutside(dropdownRef, () => {
    setShowDropdown(false);
  });

  return (
    <div className="Sidebar">
      <h3>Select Provider</h3>
      <ul>
        {providers.map((provider) => (
          <li key={provider} onClick={() => handleProviderClick(provider)}>
            {provider}
            {selectedProvider === provider && (
              <Dropdown provider={provider} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Dropdown = ({ provider }) => {
  const [title, setTitle] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);

  fetch(`https://api.apis.guru/v2/${provider}.json`)
  .then((response) => response.json())
  .then((data) => {
    setLogoUrl(data['apis'][provider]['info']['title']);
    setTitle(data['apis'][provider]['info']['x-logo']['url']);
  })
  .catch((error) => {
    console.error('Error fetching provider details:', error);
  });

  return (
    <div className="Dropdown">
      <img src={logoUrl} alt={provider} />
      <p>{title}</p>
    </div>
  );
};

export default Sidebar;
