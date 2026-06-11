import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovie();
  }, []);

  async function getMovie() {
    try {
      const response = await api.get(`/movies/${id}`);
      setMovie(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (!movie) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="details">
      <img src={movie.image} alt={movie.title} />

      <h1>{movie.title}</h1>
      <p>{movie.description}</p>

      <h3>Genre</h3>
      <p>{movie.genre}</p>

      <h3>Language</h3>
      <p>{movie.language}</p>

      <h3>Release Year</h3>
      <p>{movie.year}</p>

      <h3>Rating</h3>
      <p>⭐ {movie.rating}</p>

      <h3>Director</h3>
      <p>{movie.director}</p>

      <h3>Cast</h3>
      <ul>
        {movie.cast.map((actor, index) => (
          <li key={index}>{actor}</li>
        ))}
      </ul>

      <Link to={`/book-ticket/${movie.id}`} className="book-btn">
        🎟 Book Ticket
      </Link>
    </div>
  );
}

export default MovieDetails;