import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profil.css";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Profilside = ({setIsLoggedIn}) => {
  const [password, setPassword] = useState("");
  const [deleteAccountPassword, setDeleteAccountPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [elo, setElo] = useState("");
  const [admin, setAdmin] = useState("");
  const [errorMessage, setErrorMessage] =useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();


  useEffect (() => {
    try{
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      setName(decodedToken.name);
      setEmail(decodedToken.email);
      setElo(decodedToken.elo);
      setAdmin(decodedToken.admin);
    }catch (error) {
      console.error("Det er ikke mulig å decode token:", error);
      setErrorMessage("Det var ikke mulig å hente din informasjon, vennligst log in på nytt");
    }
  }, []); // tomt array siden effekten bare kjører en gang etter første render.


  const handlePasswordChange = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        "http://localhost:5000/api/users/profile",
        {
          password: password,
          newPass: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Passordet har blitt endret");
        setErrorMessage(null);
      } else {
        setErrorMessage("Kunne ikke forandre passordet ditt, vennligst prøv igjen");
      }
    } catch (error) {
      console.error("Kunne ikke forandre passordet:", error);
      setErrorMessage("Kunne ikke forandre passordet ditt, vennligst prøv igjen");
    }
  };

  const handleDeleteKonto = async () => {
    setErrorMessage(null);
    if(!confirmed) {
      window.alert("Du må bekrefte for å kunne slette kontoen");
      return;
    }
    if(!window.confirm("Er du sikker på at du vil slette kontoen din?")){
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        "http://localhost:5000/api/users/profile",
        {
          data: {
            password: deleteAccountPassword,
        },
        
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");// sender til logg inn siden
      }else{
        setErrorMessage("Kunne ikke slette kontoen din, vennligst prøv igjen");

      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Kunne ikke Slette kontoen din, vennligst prøv igjen");
    }
  };

  return (
    <div className="Profilside-body">
      <div className="profil-container">
        <h1>Profil og Instillinger </h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div>
          <p>Brukernavn: {name}</p>
          <p>Email: {email}</p>
          <p>Elo: {elo}</p>
          <p>Er administrator?: {admin ? "ja" : "Nei"}</p>
        </div>
        <div>
          <label>
            Nåværende passord:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Nytt passord:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button onClick={handlePasswordChange}>Endre passord</button>
        </div>
        <div>
          <label>
            Du må Skrive inn passordet ditt for å kunne slette kontoen din:
            <input
            type="password"
            value={deleteAccountPassword}
            onChange={(e) => setDeleteAccountPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" onChange={(e) => setConfirmed(e.target.checked)} />
            Jeg bekrefter at jeg vil slette kontoen min.
          </label>
        </div>
        <div>
          <button onClick={handleDeleteKonto}>Slett konto</button>
        </div>
      </div>
    </div>
  );
};

export default Profilside;