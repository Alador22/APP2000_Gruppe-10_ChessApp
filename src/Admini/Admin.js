import React, { useState } from "react";
import axios from 'axios';
import "./style.css";

const AdminPage = () => {
  const [inputData, setInputData] = useState('');

  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const handleButtonClick = () => {
    // Replace with your own backend API endpoint
    const apiEndpoint = process.env.REACT_APP_BACKEND_URL;

    // Replace with the data you want to send to the backend
    const dataToSend = {
      email: inputData
    };

    axios.post(apiEndpoint, dataToSend)
    .then(response => {
      console.log('Melding fra Backend: ', response);
    })
    .catch(error => {
      console.error('Error fikk ikke sendt til backend: ', error);
    });
  };

  return (
    <div className="admin-page">
      <h1>Velkommen til admin siden, her er det bare du som er konge!</h1>
      <input 
        type="text" 
        value={inputData} 
        onChange={handleInputChange} 
        placeholder="Skriv epost på kontoen du vil slette her" 
      />
      <button onClick={handleButtonClick}>Slett Person</button>
    </div>
  );
};

export default AdminPage;
