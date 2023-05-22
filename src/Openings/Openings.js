import React, { useState, useEffect } from "react";

import axios from "axios";

const Openings = () => {
  const [inputValue, setInputValue] = useState("");
  const [openings, setOpenings] = useState([]);

  const handleButtonClick = () => {
    console.log(inputValue);
  };

  const fetchOpenings = async () => {
    const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL  + "/api/openings");
    const data = await response.json();
    setOpenings(data);
  };

  useEffect(() => {
    fetchOpenings();
  }, []);

  return (
    <div className="Profilside-body">
      <div className="profil-container">
        <div>
          <label>
            Epost:
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button onClick={handleButtonClick}>Submit</button>
        </div>
        <div>
          <button onClick={fetchOpenings}>Fetch Openings</button>
        </div>
        <div>
          {openings.map((opening, index) => (
            <div key={index}>
              <h2>{opening.name}</h2>
              <p>{opening.moves.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Openings;
