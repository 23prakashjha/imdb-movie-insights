import express from "express";
import { fetchMovieDetails } from "../services/imdbService.js";
import { analyzeReviews } from "../services/aiService.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const imdbID = req.params.id.trim();

    if (!/^tt\d+$/.test(imdbID)) {
      return res.status(400).json({
        error: "Invalid IMDb ID format"
      });
    }

    const movie = await fetchMovieDetails(imdbID);

    let sentimentSummary = "AI analysis unavailable.";

    try {
      const ai = await analyzeReviews(movie.reviews);
      sentimentSummary = ai.sentimentSummary;
    } catch (aiError) {
      console.error("AI ERROR:", aiError.message);
      sentimentSummary = "AI quota exceeded or unavailable.";
    }

    res.json({
      ...movie,
      sentimentSummary
    });

  } catch (error) {
    console.error("SERVER ERROR:", error.message);

    res.status(500).json({
      error: error.message
    });
  }
});

export default router;