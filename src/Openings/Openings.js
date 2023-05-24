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

 
// godkjenner at strukturen/moves som blir prøvd å lagret er skrever på riktig måte
  const validateMoves = (moves) => {
    const movePattern = /^[a-h][1-8][a-h][1-8]$/;
    const movesArray = moves.toLowerCase().split(",");// hvis noen skriver med store bokstaver blir de gjort til små og hvert move skal skilles med et komma.
    if (movesArray.length > 10) {
      return "Du kan maks legge til 10 trekk i en åpning";
    }
    for (let move of movesArray) {
      if (!movePattern.test(move)) {
        return "Trekk skal skrives som 'bokstav-tall-bokstav-tall, sånn som e2e4 og skilt med komma e2e4, b2b4";
      }
    }
    return "";
  };

 


  const handleButtonClick = async () => {
    const errorMessage = validateMoves(opening.moves);
    if(errorMessage) {
      alert(errorMessage);
      return;
    }

    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/openings/save",
        opening,// sender riktig format til databasen
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

  const fetchUserId = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/user/_id",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
  
      const userId = response.data._Id;
      return userId;
    } catch (error) {
      console.error("Error while fetching user ID:", error);
    }
  };
  
  const patchOpenings = async () => {
    try {
      const response = await axios.patch(
        process.env.REACT_APP_BACKEND_URL + "/openings/" + selectedOpeningId,
        opening,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
  
      setOpening(response.data);
    } catch (error) {
      console.error("Error while fetching openings:", error);
    }
  };

  let openingIds = [];

  const [openings, setOpenings] = useState([]);

  const fetchOpenings = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/openings",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
  
      const data = response.data;

      // Combine the default and custom openings into one array
      const allOpenings = [...data.defaultOpenings, ...data.customOpenings];

      // Update the state with the fetched openings
      setOpenings(allOpenings);
    } catch (error) {
      console.error('Failed to fetch openings:', error);
    }
  };
  const [selectedOpeningId, setSelectedOpeningId] = useState(null);

const handleOpeningClick = (opening) => {
  setSelectedOpeningId(opening._id);
};

  return (
    <div className="Profilside-body">
      <div className="profil-container">
        <h1>Lag dine egne åpningstrekk</h1>
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
              placeholder="skriv på denne måten: e2e4, f2f4"
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
          <button onClick={patchOpenings}>Endre på Åpninger</button>
        </div>
        <div>
          <button onClick={fetchOpenings}>Henter alle åpninger</button>
        </div>
        <div className="Ope">
  {openings.map((opening) => (
    <div 
      key={opening._id} 
      onClick={() => handleOpeningClick(opening)}
    >
      <h2>{opening.name}</h2>
      <p>{opening.moves}</p>
      <p>{opening.description}</p>
    </div>
  ))}
</div>
      </div>
    </div>
  );
}

export default Openings;
