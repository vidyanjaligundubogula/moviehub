import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import MovieCard from "../components/MovieCard";

function Movies() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [language, setLanguage] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(() => {
    getMovies();
  }, []);

  async function getMovies() {
    const response = await api.get("/movies");
    setMovies(response.data);
  }

  async function deleteMovie(id) {
    await api.delete(`/movies/${id}`);
    setMovies(movies.filter((movie) => movie.id !== id));
  }

  const filteredMovies = movies.filter((movie) => {
    const searchMatch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const genreMatch = genre === "All" || movie.genre === genre;
    const languageMatch = language === "All" || movie.language === language;

    return searchMatch && genreMatch && languageMatch;
  });

  let finalMovies = [...filteredMovies];

  if (sort === "high") {
    finalMovies.sort((a, b) => b.rating - a.rating);
  }

  if (sort === "low") {
    finalMovies.sort((a, b) => a.rating - b.rating);
  }

  return (
    <>
      <div className="page-header">
        <h1>Popular Movies</h1>

        {user && (
          <Link to="/add-movie" className="add-btn">
            + Add Movie
          </Link>
        )}
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option>All</option>
          <option>Action</option>
          <option>Drama</option>
          <option>Comedy</option>
          <option>Romance</option>
          <option>Thriller</option>
          <option>Sci-Fi</option>
        </select>

        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option>All</option>
          <option>English</option>
          <option>Hindi</option>
          <option>Telugu</option>
          <option>Tamil</option>
          <option>Malayalam</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort Rating</option>
          <option value="high">High To Low</option>
          <option value="low">Low To High</option>
        </select>
      </div>

      <div className="movies">
        {finalMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onDelete={deleteMovie}
          />
        ))}
      </div>
    </>
  );
}

export default Movies;