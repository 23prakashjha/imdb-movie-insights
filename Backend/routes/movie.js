import express from "express";
import { fetchMovieDetails } from "../services/imdbService.js";
import { analyzeReviews } from "../services/aiService.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const imdbID = (req.params.id || "").trim();
    console.log("Requested IMDb ID:", imdbID);

    // Validate IMDb ID
    if (!/^tt\d{7,8}$/.test(imdbID)) {
      return res.status(400).json({
        error: "Invalid IMDb ID format (example: tt0111161)",
      });
    }

    // Fetch Movie Details
    let movie;
    try {
      movie = await fetchMovieDetails(imdbID);
    } catch (err) {
      console.error("OMDB ERROR:", err.message);
      return res.status(404).json({
        error: err.message || "Movie not found",
      });
    }

    // AI Sentiment Analysis
    let sentimentSummary = "AI analysis unavailable.";

    if (movie.reviews && movie.reviews.length > 0) {
      try {
        const ai = await analyzeReviews(movie.reviews);
        sentimentSummary =
          ai?.sentimentSummary || "Audience reactions are mixed.";
      } catch (aiError) {
        console.error("AI ERROR:", aiError.message);

        if (aiError.message.includes("quota")) {
          sentimentSummary =
            "AI quota exceeded. Please try again later.";
        } else {
          sentimentSummary =
            "AI service temporarily unavailable.";
        }
      }
    }

    return res.status(200).json({
      title: movie.title || "N/A",
      poster: movie.poster || "",
      cast: movie.cast || [],
      year: movie.year || "N/A",
      rating: movie.rating || "N/A",
      plot: movie.plot || "No plot available.",
      sentimentSummary,
    });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

export default router;