import axios from "axios";

export const fetchMovieDetails = async (id) => {
  const apiKey = process.env.OMDB_API_KEY;

  if (!apiKey) {
    throw new Error("OMDB_API_KEY not set in environment variables");
  }

  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      i: id,
      apikey: apiKey,
      plot: "short"
    }
  });

  const data = response.data;

  if (!data || data.Response === "False") {
    throw new Error(data?.Error || "Movie not found");
  }

  return {
    title: data.Title,
    poster: data.Poster,
    cast: data.Actors ? data.Actors.split(",") : [],
    year: data.Year,
    rating: data.imdbRating,
    plot: data.Plot,
    reviews: [
      "Amazing cinematography and storytelling.",
      "A bit slow but visually stunning.",
      "One of the best movies ever made."
    ]
  };
};