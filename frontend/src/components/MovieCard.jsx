import React from "react";
import { motion } from "framer-motion";
import SentimentBadge from "./SentimentBadge";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const MovieCard = ({ movie }) => {
  if (!movie) return null;

  const ratingPercentage = movie.rating
    ? (parseFloat(movie.rating) / 10) * 100
    : 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.01 }}
      className="relative w-full max-w-6xl mx-auto
                 bg-linear-to-br from-gray-900/90 to-gray-800/70
                 backdrop-blur-2xl
                 rounded-3xl
                 shadow-[0_0_60px_rgba(0,0,0,0.6)]
                 border border-gray-700/50
                 overflow-hidden
                 p-6 md:p-10
                 transition-all duration-500"
    >
      {/* Glow Accent */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-600/20 blur-[120px] rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full" />

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* 🎬 Poster Section */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center md:justify-start"
        >
          <motion.img
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.4 }}
            src={movie.poster}
            alt={movie.title}
            className="rounded-2xl
                       shadow-2xl
                       w-64 md:w-full
                       max-w-xs
                       object-cover
                       border border-gray-700"
          />
        </motion.div>

        {/* 📄 Content Section */}
        <div className="md:col-span-2 space-y-7">

          {/* Title + Badge */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {movie.title}
            </h2>

            <SentimentBadge sentiment={movie.sentimentSummary} />
          </motion.div>

          {/* Year + Rating */}
          <motion.div variants={itemVariants}>
            <p className="text-gray-400 text-lg mb-2">
              {movie.year} • ⭐ {movie.rating}
            </p>

            {/* Animated Rating Bar */}
            <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${ratingPercentage}%` }}
                transition={{ duration: 1 }}
                className="h-3 bg-linear-to-r from-yellow-400 to-orange-500 rounded-full"
              />
            </div>
          </motion.div>

          {/* Plot */}
          <motion.p
            variants={itemVariants}
            className="text-gray-300 leading-relaxed text-base md:text-lg"
          >
            {movie.plot}
          </motion.p>

          {/* Cast Section */}
          {movie.cast && movie.cast.length > 0 && (
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-xl mb-4 text-white">
                Cast
              </h3>

              <div className="flex flex-wrap gap-3">
                {movie.cast.map((actor, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="px-4 py-2
                               bg-gray-800/80
                               rounded-full
                               text-sm
                               text-gray-300
                               border border-gray-700
                               hover:bg-linear-to-r
                               hover:from-blue-500
                               hover:to-purple-500
                               hover:text-white
                               transition-all duration-300"
                  >
                    {actor}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* AI Insight */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-xl mb-4 text-white">
              AI Audience Insight
            </h3>

            <div className="bg-gray-800/60
                            border border-gray-700
                            p-6
                            rounded-2xl
                            text-gray-300
                            whitespace-pre-line
                            leading-relaxed
                            backdrop-blur-lg">
              {movie.sentimentSummary}
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;