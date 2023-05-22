import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import DropdownMeny from "./dropdownmeny"
import { AuthContext } from "../AuthContext";
import jwtDecode from "jwt-decode";

function Navbar({ isLoggedIn, setIsLoggedIn }) {

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const { authData, admin } = useContext(AuthContext);
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
          <NavLink to="/Profilside/Openings">Åpninger</NavLink>
        </li>
        <li>
  {admin && <NavLink to="/AdminPage">Administrator</NavLink>}
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