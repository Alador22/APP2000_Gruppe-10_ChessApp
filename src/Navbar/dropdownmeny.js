import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

const DropdownMeny = ({ isLoggedIn, setIsLoggedIn }) => {
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
    return () => {
      document.removeEventListener("mousedown", handleTrykketUtenfor);
    };
  }, []);

  return (
    <div className={`dropdown-meny ${isOpen ? "show" : ""}`} ref={ref}>
      <button onClick={trykkapen}>Meny</button>
      {isLoggedIn}
      <div className={`dropdown-innhold ${isOpen ? "open" : ""}`}>
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
    </div>
  );
};

export default DropdownMeny;
