import React, { useState, useEffect } from 'react';

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


export default ProviderDetails;
