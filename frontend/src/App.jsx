import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import MovieCard from "./components/MovieCard";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const [id, setId] = useState("");
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovie = async () => {
    if (!id.trim()) {
      setError("Please enter a valid IMDb ID (e.g., tt0133093)");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMovie(null);

      const res = await axios.get(
        `https://imdb-movie-insights.onrender.com/api/movie/${id}`
      );

      setMovie(res.data);
    } catch (err) {
      setError("Movie not found or server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchMovie();
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-black via-gray-900 to-gray-950 text-white px-4 py-12">

      {/* Animated Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-600/20 blur-[150px] rounded-full animate-pulse" />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            IMDb AI Insight
          </h1>
          <p className="text-gray-400 mt-4 text-sm md:text-base">
            Discover intelligent audience sentiment insights instantly
          </p>
        </motion.div>

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900/70 backdrop-blur-xl border border-gray-700 rounded-3xl p-6 md:p-8 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Enter IMDb ID (e.g., tt0133093)"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 p-4 rounded-2xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <button
              onClick={fetchMovie}
              disabled={loading}
              className={`px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                loading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-linear-to-r from-blue-500 to-purple-600 hover:scale-105 hover:shadow-xl"
              }`}
            >
              {loading ? "Fetching..." : "Fetch Movie"}
            </button>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="mt-14">

          <AnimatePresence mode="wait">

            {loading && (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Loader />
              </motion.div>
            )}

            {error && !loading && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ErrorMessage message={error} />
              </motion.div>
            )}

            {movie && !loading && (
              <motion.div
                key="movie"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};

export default App;