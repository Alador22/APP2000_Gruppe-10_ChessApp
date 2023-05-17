import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import DropdownMeny from "./dropdownmeny"

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Practice">Practice</Link>
        </li>
        <li>
          <Link to="/FindMatches">Find Matches</Link>
        </li>
      </ul>
      <DropdownMeny isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </nav>
  );
}

export default Navbar;
