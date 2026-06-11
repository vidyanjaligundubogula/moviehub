import { useEffect, useState } from "react";
import api from "../services/api";

function MyBookings() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings();
  }, []);

  async function getBookings() {
    const response = await api.get("/bookings");

    const myBookings = response.data.filter(
      (booking) => booking.email === user.email
    );

    setBookings(myBookings);
  }

  async function cancelBooking(id) {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    await api.delete(`/bookings/${id}`);

    setBookings(bookings.filter((booking) => booking.id !== id));
  }

  return (
    <div>
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="empty-box">
          <h2>No Bookings Found</h2>
          <p>Book tickets from the movie details page.</p>
        </div>
      ) : (
        <div className="movies">
          {bookings.map((booking) => (
            <div className="card" key={booking.id}>
              <img src={booking.movieImage} alt={booking.movieTitle} />

              <div className="card-body">
                <h3>{booking.movieTitle}</h3>
                <p>👤 {booking.name}</p>
                <p>📧 {booking.email}</p>
                <p>🎟 Seats: {booking.seats}</p>
                <p>📅 Show Date: {booking.date}</p>
                <p>⏰ Show Time: {booking.time}</p>
                <p>💵 Ticket Price: ₹{booking.ticketPrice}</p>
                <p>💰 Total: ₹{booking.totalAmount}</p>
                <p>🧾 Booked On: {booking.bookingDate}</p>

                <button
                  className="delete-btn full"
                  onClick={() => cancelBooking(booking.id)}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;