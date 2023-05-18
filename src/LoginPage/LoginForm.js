import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../shared/util/validators";


// Definerer tilstander login / registrering
const LoginForm = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const navigate = useNavigate();


  // Funksjon for å sende innloggingen
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/users/login",
        { email, 
          password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      onLogin(); // Oppdater innloggingsstatus til App-komponenten
      navigate("HomePage"); // etter vellykket innlogging, så blir brukeren omderigert til HomePage.
    } catch (error) {
      console.error(error);
    }
  };


  // Funksjon for å sende registreringen
  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    if (typeof password !== "string") {
      setErrorMessage("Password must be a string");
      return;
    }
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/users/signup",
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setRegistrationSuccessful(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Funksjon for å vise registreringsskjemaet
  const handleRegisterClick = () => {
    setShowRegisterForm(true);
    setRegistrationSuccessful(false);
    setErrorMessage("");
  };
  // Funksjon for å avbryte registreringen
  const handleBackToLoginClick = () => {
    setShowRegisterForm(false);
    setRegistrationSuccessful(false);
    setErrorMessage("");
  };

  // Returnerer det faktiske skjemaet med input-felt, knapper og validering
  return (
    <div className="container">
      <form
        className="form"
        onSubmit={showRegisterForm ? handleRegisterSubmit : handleLoginSubmit}
      >
        {showRegisterForm && (
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <br />
          </div>
        )}
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            validators={[VALIDATOR_EMAIL()]}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Vær så snill og lag passordet 6 karakterer langt!"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        {registrationSuccessful ? (
          <div>
            <p>Registrering gjennomført! Logg deg inn!.</p>
            <button
              onClick={handleBackToLoginClick}
              className="register-btn-small"
            >
              Tilbake til Logg inn siden
            </button>
          </div>
        ) : (
          <div>
            <button
              type="submit"
              className={showRegisterForm ? "cancel-btn" : "login-btn"}
            >
              {showRegisterForm ? "Register now" : "Log In"}
            </button>
            {showRegisterForm ? (
              <button
                onClick={handleBackToLoginClick}
                className="register-btn-small"
              >
                Tilbake til LoginSiden
              </button>
            ) : (
              <p>
                Har du ikke en konto?{" "}
                <button
                  onClick={handleRegisterClick}
                  className="register-btn-small"
                >
                  Registrer deg her!
                </button>
              </p>
            )}
          </div>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}
export default LoginForm;
