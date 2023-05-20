import React, { useState } from "react";
import "./Profil.css";

const Profilside = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordChange = async () => {
    const response = await fetch("http://localhost:5000/api/users/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: newPassword,
        newPass: newPassword,
      }),
    });

    if (response.ok) {
      //sier ifra at man fikk byttet passord
      console.log("passord endret");
    } else {
      //sier ifra man ikke fikk byttet passord
      console.log("Feil, passord ikke byttet");
    }
  };

  const handleDeleteKonto = async () => {
    const response = await fetch("http://localhost:5000/api/users/profile", {
      method: "DELETE",
    });

    if (response.ok) {
      //sier ifra om konto ble slettet
      console.log("konto ble slettet");
    } else {
      // sier ifra om kontoen ikke ble slettet
      console.log("Feil, konto ikke slettet");
    }
  };

  return (
    <div className="Profilside-body">
      <div className="profil-container">
        <h1>Profil og Instillinger </h1>
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
