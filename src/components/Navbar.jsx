import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const favorites = useSelector((state) => state.favorites);

  return (
    <nav>
      <Link to="/" className="logo">
        🎬 MovieHub
      </Link>

      <Link to="/">Home</Link>

      <Link to="/movies">Movies</Link>

      <Link to="/favorites">Favorites ({favorites.length})</Link>

      {user && <Link to="/my-bookings">My Bookings</Link>}

      {!user && (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}

      {user && (
        <>
          <span className="welcome-user">Hi, {user.name}</span>
          <Link to="/logout">Logout</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;