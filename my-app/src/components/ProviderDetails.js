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
        function changeDetails (event) {
            setDetails({
                title: data['apis'][provider]['info']['title'],
                logo: data['apis'][provider]['info']['x-logo']['url']
            }) 
            console.log(data['apis'][provider]['info']['title'])
        };
        changeDetails()
            // this.setDetails({title: data['apis'][provider]['info']['title']})
        // title: data['apis'][provider]['info']['title'],
        // logo: data['apis'][provider]['info']['x-logo']['url']
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
      <p>{details.info && details.info.description}</p>
      <button onClick={onBackClick}>Explore more APIs</button>
    </div>
  );
};


export default ProviderDetails;
