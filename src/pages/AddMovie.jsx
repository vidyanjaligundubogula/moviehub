import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddMovie() {
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

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newMovie = {
      ...formData,
      rating: Number(formData.rating),
      cast: formData.cast.split(",")
    };

    await api.post("/movies", newMovie);

    navigate("/movies");
  }

  return (
    <div className="form-container">
      <h2>Add Movie</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Movie Title" onChange={handleChange} />

        <input name="genre" placeholder="Genre" onChange={handleChange} />

        <input name="language" placeholder="Language" onChange={handleChange} />

        <input name="year" placeholder="Release Year" onChange={handleChange} />

        <input name="rating" placeholder="Rating" onChange={handleChange} />

        <input name="director" placeholder="Director" onChange={handleChange} />

        <input name="image" placeholder="Image URL" onChange={handleChange} />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <input
          name="cast"
          placeholder="Cast names separated by comma"
          onChange={handleChange}
        />

        <button className="submit-btn">Add Movie</button>
      </form>
    </div>
  );
}

export default AddMovie;