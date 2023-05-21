import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profil.css";
import jwtDecode from "jwt-decode";

const Profilside = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [elo, setElo] = useState("");
  const [admin, setAdmin] = useState("");

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    setName(decodedToken.name);
    setEmail(decodedToken.email);
    setElo(decodedToken.elo);
    setAdmin(decodedToken.admin);
  }, [decodedToken]);

  const handlePasswordChange = async () => {
    try {
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
        //sier ifra om passord ble byttet
        console.log("passord endret");
      } else {
        //sier ifra om passord ikke ble byttet
        console.log("Feil, passord ikke byttet");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteKonto = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/users/profile"
      );

      if (response.status === 200) {
        //sier ifra om konto ble slettet
        console.log("konto ble slettet");
      } else {
        // sier ifra om kontoen ikke ble slettet
        console.log("Feil, konto ikke slettet");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Profilside-body">
      <div className="profil-container">
        <h1>Profil og Instillinger </h1>
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
          <button onClick={handleDeleteKonto}>Slett konto</button>
        </div>
      </div>
    </div>
  );
};

export default Profilside;
