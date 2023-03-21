import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";


// Definerer tilstander login / registrering
function LoginForm() {
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
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
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
            type="text"
            name="email"
            value={email}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        {registrationSuccessful ? (
          <div>
            <p>Registration successful! Go login.</p>
            <button
              onClick={handleBackToLoginClick}
              className="register-btn-small"
            >
              Back to Login
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
                Back to Login
              </button>
            ) : (
              <p>
                Don't have an account?{" "}
                <button
                  onClick={handleRegisterClick}
                  className="register-btn-small"
                >
                  Register here
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
