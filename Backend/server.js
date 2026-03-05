import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import movieRoutes from "./routes/movie.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/movie", movieRoutes);

app.get("/", (req, res) => {
  res.send("IMDb Movie Insights API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});