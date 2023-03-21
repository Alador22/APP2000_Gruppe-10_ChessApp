import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Navbar() {
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
      <Link to="/"><button>Log in</button></Link>
    </nav>
  );
}

export default Navbar;