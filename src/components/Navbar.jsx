import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function Navbar() {
  const { currentUser, logout } = useAppContext();

  return (
    <nav className="navbar">
      <Link className="brand" to="/">
        <span className="brand-mark" aria-hidden="true">
          <span>Z</span>
          <span>S</span>
        </span>
        <span>
          <strong>Zaynab's Salon</strong>
          <small>Beauty studio</small>
        </span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/match">Beauty Match</Link>
        <Link to="/mood-board">Mood Board</Link>
        {currentUser && <Link to="/my-salon">My Salon</Link>}
        {currentUser && <Link to="/booking">Book</Link>}
        {currentUser?.role === 'admin' && <Link to="/admin">Admin</Link>}
      </div>

      {currentUser ? (
        <div className="nav-user">
          <span>{currentUser.name}</span>
          <button type="button" onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className="nav-auth">
          <Link to="/login">Login</Link>
          <Link className="nav-cta" to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
