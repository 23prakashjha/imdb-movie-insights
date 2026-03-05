import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import MovieCard from "./components/MovieCard";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

const API_BASE = "https://imdb-movie-insights.onrender.com";

const App = () => {
  const [id, setId] = useState("");
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovie = async () => {
    const cleanId = id.trim();

    if (!/^tt\d{7,8}$/.test(cleanId)) {
      setError("Invalid IMDb ID format (example: tt0111161)");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMovie(null);

      const res = await axios.get(
        `${API_BASE}/api/movie/${cleanId}`
      );

      setMovie(res.data);

    } catch (err) {
      if (err.response?.status === 404) {
        setError("Movie not found. Please check IMDb ID.");
      } else if (err.response?.status === 400) {
        setError("Invalid IMDb ID format.");
      } else {
        setError("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchMovie();
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-center mb-6">
        IMDb AI Insight
      </h1>

      <div className="flex gap-4 justify-center mb-8">
        <input
          type="text"
          placeholder="Enter IMDb ID (e.g., tt0111161)"
          value={id}
          onChange={(e) =>
            setId(e.target.value.replace(/\s+/g, ""))
          }
          onKeyDown={handleKeyPress}
          className="p-3 text-black rounded"
        />

        <button
          onClick={fetchMovie}
          disabled={loading}
          className="bg-blue-600 px-4 py-3 rounded"
        >
          {loading ? "Fetching..." : "Fetch Movie"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {movie && <MovieCard movie={movie} />}
      </AnimatePresence>
    </div>
  );
};

export default App;