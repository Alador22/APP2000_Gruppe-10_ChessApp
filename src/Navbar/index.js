import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../AuthContext";
import './style.css';

<<<<<<< HEAD
function Navbar({ isLoggedIn, setIsLoggedIn }) {
=======
function Navbar() {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  };

>>>>>>> 54efbe36ebc3fb741f5af893a6d3081c1ea873c3
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
<<<<<<< HEAD
      
      <Link to="/"><button onClick={() => {
      if (isLoggedIn) {
        setIsLoggedIn(false);
      }
    }}
  >
    {isLoggedIn ? "Log Out" : "Log In"}
  </button>
</Link>
=======
      <button onClick={handleLogoutClick}>{isLoggedIn ? 'Logg ut' : 'Logg inn'}</button>
>>>>>>> 54efbe36ebc3fb741f5af893a6d3081c1ea873c3
    </nav>
    
  );
}

export default Navbar;
