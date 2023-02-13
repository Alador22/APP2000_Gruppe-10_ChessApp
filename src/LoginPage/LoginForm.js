import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";

function LoginForm() {
  // Definerer tilstander for innlogging
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    } catch (error) {
      console.error(error);
    }
  };

  // Funksjon for å sende registreringen
  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/users/register",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      alert("Registration successful! Please log in.");
    } catch (error) {
      console.error(error);
    }
  };

  // Funksjon for å vise registreringsskjemaet
  const handleRegisterClick = () => {
    setShowRegisterForm(true);
    setErrorMessage("");
  };

  // Funksjon for å avbryte registreringen
  const handleCancelClick = () => {
    setShowRegisterForm(false);
    setErrorMessage("");
  };

  // Returnerer det faktiske skjemaet med input-felt, knapper og validering
  return (
    <div className="container">
      <form className="form" onSubmit={showRegisterForm ? handleRegisterSubmit : handleLoginSubmit}>
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
        {showRegisterForm && (
          <div>
            <label>
              Confirm Password:
              <input
                type="password"
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            <br />
          </div>
        )}
        <button type="submit" className={showRegisterForm ? "register-btn" : "login-btn"}>
          {showRegisterForm ? "Register" : "Log In"}
        </button>
        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}
        {!showRegisterForm && (
          <p>
            Don't have an account?{" "}
            <button onClick={handleRegisterClick} className="register-btn-small">
              Register Here
            </button>
          </p>
        )}
        {showRegisterForm && (
          <div>
            <button onClick={handleCancelClick} className="cancel-btn">
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginForm;