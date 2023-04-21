import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../AuthContext";
import './style.css';

function Navbar() {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  };

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
      <button onClick={handleLogoutClick}>{isLoggedIn ? 'Logg ut' : 'Logg inn'}</button>
    </nav>
  );
}

export default Navbar;
