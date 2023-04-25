import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import Practice from "./Practice";
import FindMatches from "./FindMatches";
import LoginForm from "./LoginPage/LoginForm";
import './App.css';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginState = (state) => {
    setIsLoggedIn(state);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="app-content">
        {isLoggedIn ? (
          <Routes>
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/Practice" element={<Practice />} />
            <Route path="/FindMatches" element={<FindMatches />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        ) : (
          <LoginForm onLogin={() => handleLoginState(true)} />
        )}
      </div>
      </Router>
        
  );
}

export default App;