
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();  // Henter navigasjonsfunksjonen fra react-router-dom

  const handleLogoutClick = () => {
    setIsLoggedIn(false);  // Setter isLoggedIn til false
    navigate('/');  // Navigerer tilbake til hovedsiden
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