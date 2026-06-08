import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Unlimited Movies, Reviews & Entertainment</h1>

        <p>
          Discover trending movies, save favorites,
          search by genre and build your own collection.
        </p>

        <Link to="/movies" className="hero-btn">
          Explore Movies
        </Link>
      </div>
    </section>
  );
}

export default Home;