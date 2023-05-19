import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink } from 'react-router-dom';
import { AuthContext } from "../AuthContext"; // Change to your correct path

const DropdownMeny = ({ isLoggedIn, setIsLoggedIn }) => {
  const { authData } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const trykkapen = () => {
    setIsOpen(!isOpen);
  };

  const handleTrykketUtenfor = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleTrykketUtenfor);
    // funksjonen skal rydde opp, ved å fjerne listener når det inntreffer
    return () => {
      document.removeEventListener("mousedown", handleTrykketUtenfor);
    };
  }, []); // en tom avhengighetsarray som gjør at effekten kjører kun 1 gang når komponenten monteres i DOM (Document Object Model)

  return (
    <div className={`dropdown-meny ${isOpen ? "show" : ""}`} ref={ref}>
      <button onClick={trykkapen}>Meny</button>
      {isLoggedIn && <p>Logged in as: {authData.email}</p>} {/* Her vises brukerens epost */}
      {isOpen && (
        <div className="dropdown-innhold">
          <NavLink to="/Profilside">Profilside</NavLink>
          <NavLink to="/">
            <button
              onClick={() => {
                if (isLoggedIn) {
                  setIsLoggedIn(false);
                }
              }}
            >
              {isLoggedIn ? "Log Out" : "Log In"}
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default DropdownMeny;
