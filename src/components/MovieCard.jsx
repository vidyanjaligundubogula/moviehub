import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavorite } from "../features/favoriteSlice";

function MovieCard({ movie, onDelete }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="card">
      <img src={movie.image} alt={movie.title} />

      <div className="card-body">
        <h3>{movie.title}</h3>
        <p>🎭 {movie.genre}</p>
        <p>⭐ {movie.rating}</p>
        <p>📅 {movie.year}</p>

        <div className="card-actions">
          <Link className="view-btn" to={`/movies/${movie.id}`}>
            View
          </Link>

          {user && (
            <>
              <Link className="edit-btn" to={`/edit-movie/${movie.id}`}>
                Edit
              </Link>

              <button
                className="delete-btn"
                onClick={() => onDelete(movie.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>

        <button
          className="favorite-btn"
          onClick={() => dispatch(addFavorite(movie))}
        >
          ❤ Add Favorite
        </button>
      </div>
    </div>
  );
}

export default MovieCard;