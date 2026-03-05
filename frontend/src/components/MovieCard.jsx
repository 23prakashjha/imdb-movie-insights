import React from "react";
import { motion } from "framer-motion";
import SentimentBadge from "./SentimentBadge";

const MovieCard = ({ movie, loading }) => {
  if (loading) {
    return (
      <div className="text-center text-gray-400 text-lg py-20">
        🎬 Fetching movie insights...
      </div>
    );
  }

  if (!movie) return null;

  const ratingPercentage = movie.rating
    ? (parseFloat(movie.rating) / 10) * 100
    : 0;

  const poster =
    movie.poster && movie.poster !== "N/A"
      ? movie.poster
      : "https://via.placeholder.com/400x600?text=No+Poster";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-6xl mx-auto
                 bg-linear-to-br from-gray-900/90 to-gray-800/80
                 backdrop-blur-2xl
                 rounded-3xl
                 shadow-2xl
                 border border-gray-700/50
                 overflow-hidden
                 p-6 md:p-10"
    >
      {/* Background Glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-600/20 blur-[150px] rounded-full" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/20 blur-[150px] rounded-full" />

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Poster */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex justify-center md:justify-start"
        >
          <img
            src={poster}
            alt={movie.title}
            className="rounded-2xl shadow-2xl w-64 md:w-full max-w-xs object-cover border border-gray-700"
          />
        </motion.div>

        {/* Content */}
        <div className="md:col-span-2 space-y-8">

          {/* Title + Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {movie.title}
            </h2>
            <SentimentBadge sentiment={movie.sentimentSummary} />
          </div>

          {/* Year & Rating */}
          <div>
            <p className="text-gray-400 text-lg mb-3">
              {movie.year} • ⭐ {movie.rating || "N/A"}
            </p>

            <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${ratingPercentage}%` }}
                transition={{ duration: 1 }}
                className="h-3 bg-linear-to-r from-yellow-400 to-orange-500 rounded-full"
              />
            </div>
          </div>

          {/* Plot */}
          <p className="text-gray-300 leading-relaxed text-base md:text-lg">
            {movie.plot}
          </p>

          {/* Cast */}
          {movie.cast?.length > 0 && (
            <div>
              <h3 className="font-semibold text-xl mb-4 text-white">
                Cast
              </h3>

              <div className="flex flex-wrap gap-3">
                {movie.cast.map((actor, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.08 }}
                    className="px-4 py-2 bg-gray-800/80 rounded-full text-sm text-gray-300 border border-gray-700 hover:bg-linear-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300"
                  >
                    {actor}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* AI Insight Section */}
          <div>
            <h3 className="font-semibold text-xl mb-4 text-white">
              🤖 AI Audience Insight
            </h3>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-linear-to-br from-gray-800/70 to-gray-900/80
                         border border-purple-500/20
                         p-6
                         rounded-2xl
                         text-gray-300
                         leading-relaxed
                         backdrop-blur-xl
                         shadow-lg"
            >
              {movie.sentimentSummary ||
                "This is the Best Movie to Watch them."}
            </motion.div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;