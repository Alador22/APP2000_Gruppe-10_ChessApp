import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="HomePage">Home</Link>
        </li>
        <li>
          <Link to="/Practice">Practice</Link>
        </li>
        <li>
          <Link to="/FindMatches">Find Matches</Link>
        </li>
      </ul>
      
      <Link to="/"><button onClick={() => {
      if (isLoggedIn) {
        setIsLoggedIn(false);
      }
    }}
  >
    {isLoggedIn ? "Log Out" : "Log In"}
  </button>
</Link>
    </nav>
    
  );
}

export default Navbar;