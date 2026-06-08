import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    language: "",
    year: "",
    rating: "",
    director: "",
    image: "",
    description: "",
    cast: ""
  });

  useEffect(() => {
    getMovie();
  }, []);

  async function getMovie() {
    const response = await api.get(`/movies/${id}`);

    setFormData({
      ...response.data,
      cast: response.data.cast.join(", ")
    });
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const updatedMovie = {
      ...formData,
      rating: Number(formData.rating),
      cast: formData.cast.split(",")
    };

    await api.put(`/movies/${id}`, updatedMovie);

    navigate("/movies");
  }

  return (
    <div className="form-container">
      <h2>Edit Movie</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />

        <input
          name="language"
          value={formData.language}
          onChange={handleChange}
        />

        <input
          name="year"
          value={formData.year}
          onChange={handleChange}
        />

        <input
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />

        <input
          name="director"
          value={formData.director}
          onChange={handleChange}
        />

        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          name="cast"
          value={formData.cast}
          onChange={handleChange}
        />

        <button className="submit-btn">Update Movie</button>
      </form>
    </div>
  );
}

export default EditMovie;