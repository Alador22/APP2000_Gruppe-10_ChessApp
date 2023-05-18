import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/NavBar";
import HomePage from "./HomePage";
import Practice from "./Practice";
import FindMatches from "./FindMatches";
import LoginForm from "./LoginPage/LoginForm";
import './App.css';


function App() {
// State-variabel for påloggingstilstand og dens oppdateringsfunksjon
const [isLoggedIn, setIsLoggedIn] = useState(false);

// Funksjon for å oppdatere påloggingstilstanden
const handleLoginState = (state) => {
setIsLoggedIn(state);
};


return (
// Håndterer ruting mellom sidene med BrowserRouter
<Router>
{/* Viser Navbar-komponenten hvis brukeren er logget inn */}
{isLoggedIn && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
 {/* Appens innhold av sider */}
 <div className="app-content">
    {/* Viser rutekomponentene hvis brukeren er logget inn */}
    {isLoggedIn ? (
      <Routes>
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Practice" element={<Practice />} />
        <Route path="/FindMatches" element={<FindMatches />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    ) : (
      // Viser LoginForm-komponenten hvis brukeren ikke er logget inn
      <LoginForm onLogin={() => handleLoginState(true)} />
    )}
  </div>
</Router>
);
}


export default App;