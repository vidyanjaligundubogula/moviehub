import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function BookTicket() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [movie, setMovie] = useState(null);

  const [booking, setBooking] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    seats: "",
    date: "",
    time: ""
  });

  useEffect(() => {
    getMovie();
  }, []);

  async function getMovie() {
    try {
      const response = await api.get(`/movies/${id}`);
      setMovie(response.data);
    } catch (error) {
      console.log(error);
      alert("Movie not found");
    }
  }

  function handleChange(e) {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!movie) {
      alert("Movie data not loaded");
      return;
    }

    const newBooking = {
      name: booking.name,
      email: booking.email,
      seats: Number(booking.seats),
      date: booking.date,
      time: booking.time,
      movieId: movie.id,
      movieTitle: movie.title,
      movieImage: movie.image,
      ticketPrice: 150,
      totalAmount: Number(booking.seats) * 150,
      bookingDate: new Date().toLocaleDateString()
    };

    try {
      await api.post("/bookings", newBooking);

      alert("Ticket booked successfully!");
      navigate("/my-bookings");
    } catch (error) {
      console.log(error);
      alert("Booking failed. Check backend server and db.json bookings array.");
    }
  }

  if (!movie) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="booking-page">
      <div className="booking-movie-card">
        <img src={movie.image} alt={movie.title} />

        <div>
          <h2>{movie.title}</h2>
          <p>🎭 {movie.genre}</p>
          <p>🌐 {movie.language}</p>
          <p>⭐ {movie.rating}</p>
          <p>🎟 Ticket Price: ₹150</p>
        </div>
      </div>

      <div className="form-container">
        <h2>Book Ticket</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={booking.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={booking.email}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="seats"
            placeholder="Number of Seats"
            value={booking.seats}
            onChange={handleChange}
            min="1"
            required
          />

          <input
            type="date"
            name="date"
            value={booking.date}
            onChange={handleChange}
            required
          />

          <select
            name="time"
            value={booking.time}
            onChange={handleChange}
            required
          >
            <option value="">Select Show Time</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="1:30 PM">1:30 PM</option>
            <option value="6:00 PM">6:00 PM</option>
            <option value="9:30 PM">9:30 PM</option>
          </select>

          <button className="submit-btn">
            Confirm Booking ₹{booking.seats ? booking.seats * 150 : 0}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookTicket;