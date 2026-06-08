import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";
import AddMovie from "../pages/AddMovie";
import EditMovie from "../pages/EditMovie";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Favorites from "../pages/Favorites";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/movies" element={<Movies />} />

      <Route path="/movies/:id" element={<MovieDetails />} />

      <Route
        path="/add-movie"
        element={
          <ProtectedRoute>
            <AddMovie />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-movie/:id"
        element={
          <ProtectedRoute>
            <EditMovie />
          </ProtectedRoute>
        }
      />

      <Route path="/favorites" element={<Favorites />} />

      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />

      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default AppRoutes;