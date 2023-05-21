import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import DropdownMeny from "./dropdownmeny"
import { AuthContext } from "../AuthContext";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  
  const { authData } = useContext(AuthContext);
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact >Hjem</NavLink>
        </li>
        <li>
          <NavLink to="/Practice">Øving</NavLink>
        </li>
        <li>
          <NavLink to="/FindMatches">Profilside</NavLink>
        </li>
        <li>
          <NavLink to="/AdminPage">Administrator</NavLink>
        </li>
      </ul>
      {isLoggedIn && (
        <p className="logged-in-text">
        Logget inn som: {authData.email}
      </p>
      )}
      <DropdownMeny isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </nav>
  );
}
export default Navbar;