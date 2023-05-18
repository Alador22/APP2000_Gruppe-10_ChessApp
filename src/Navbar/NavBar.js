import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import DropdownMeny from "./dropdownmeny"

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact >Home</NavLink>
        </li>
        <li>
          <NavLink to="/Practice">Practice</NavLink>
        </li>
        <li>
          <NavLink to="/FindMatches">Find Matches</NavLink>
        </li>
      </ul>
      <DropdownMeny isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </nav>
  );
}
export default Navbar;