import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../features/favoriteSlice";

function Favorites() {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Favorite Movies</h1>

      {favorites.length === 0 ? (
        <div className="empty-box">
          <h2>No Favorite Movies</h2>
          <p>Add movies from the Movies page.</p>
        </div>
      ) : (
        <div className="movies">
          {favorites.map((movie) => (
            <div className="card" key={movie.id}>
              <img src={movie.image} alt={movie.title} />

              <div className="card-body">
                <h3>{movie.title}</h3>
                <p>🎭 {movie.genre}</p>
                <p>⭐ {movie.rating}</p>
                <p>🌐 {movie.language}</p>

                <button
                  className="delete-btn full"
                  onClick={() => dispatch(removeFavorite(movie.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;