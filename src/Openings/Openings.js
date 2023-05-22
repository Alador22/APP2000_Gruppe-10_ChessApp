import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "./style.css";

const Openings = () => {
  const [opening, setOpening] = useState({
    name: "",
    moves: "",
    description: "",
  });

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  const handleButtonClick = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/openings/save",
        opening,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
  
      console.log(response.data, "Du fikk lagret");
    } catch (error) {
      console.error("Error fikk ikke lagret:", error);
    }
  };

  const fetchOpenings = async () => {
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/openings",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    setOpening(response.data); // Set the string directly
  };

  useEffect(() => {
    fetchOpenings();
  }, []);

  return (
    <div className="Profilside-body">
      <div className="profil-container">
        <div>
          <label>
            Navn på åpning:
            <input
              type="text"
              value={opening.name}
              onChange={(e) => setOpening({ ...opening, name: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label>
            Trekk:
            <input
              type="text"
              value={opening.moves}
              onChange={(e) => setOpening({ ...opening, moves: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label>
            Forklaring:
            <input
              type="text"
              value={opening.description}
              onChange={(e) => setOpening({ ...opening, description: e.target.value })}
            />
          </label>
        </div>
        <div>
          <button onClick={handleButtonClick}>Lagre åpninger</button>
        </div>
        <div>
          <button onClick={fetchOpenings}>Hent Åpninger</button>
        </div>
        <div>
          <h2>{opening.name}</h2>
          <p>{opening.moves}</p>
          <p>{opening.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Openings;
