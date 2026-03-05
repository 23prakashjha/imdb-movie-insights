import express from "express";
import { fetchMovieDetails } from "../services/imdbService.js";
import { analyzeReviews } from "../services/aiService.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    // ✅ Always trim input
    const imdbID = (req.params.id || "").trim();

    // ✅ Strict validation
    if (!/^tt\d{7,8}$/.test(imdbID)) {
      return res.status(400).json({
        error: "Invalid IMDb ID format (example: tt0111161)"
      });
    }

    // ✅ Fetch movie safely
    let movie;
    try {
      movie = await fetchMovieDetails(imdbID);
    } catch (movieError) {
      console.error("OMDB ERROR:", movieError.message);
      return res.status(404).json({
        error: movieError.message || "Movie not found"
      });
    }

    // ✅ AI optional (never crash server)
    let sentimentSummary = "AI analysis unavailable.";

    if (movie.reviews && movie.reviews.length > 0) {
      try {
        const ai = await analyzeReviews(movie.reviews);
        sentimentSummary =
          ai?.sentimentSummary || "AI analysis unavailable.";
      } catch (aiError) {
        console.error("AI ERROR:", aiError.message);
        sentimentSummary = "AI quota exceeded or unavailable.";
      }
    }

    // ✅ Always respond safely
    return res.json({
      title: movie.title || "N/A",
      poster: movie.poster || "",
      cast: movie.cast || [],
      year: movie.year || "N/A",
      rating: movie.rating || "N/A",
      plot: movie.plot || "No plot available",
      sentimentSummary
    });

  } catch (error) {
    console.error("SERVER ERROR:", error);

    return res.status(500).json({
      error: "Internal Server Error"
    });
  }
});

export default router;