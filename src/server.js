import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import movieRoutes from "./routes/movies.js";

const app = express();
const PORT = 3000;

dotenv.config({ path: "../.env" }); // read env file

// middleware / fucntion yang dieksekusi sebelom request nyampe ke  endpoint
app.use(cors());
app.use(express.json());

// Serve Frontend (Build Vite)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve semua file di folder dist (html, css,js)
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

app.use("/", movieRoutes);
app.use("/genres", movieRoutes);
app.use("/movieTrailer/:id", movieRoutes);
app.use("popularMovies", movieRoutes);

// Category Movie Lists : Now Playing, Popular, Top Rated, Upcoming
// app.get("/movies/:category", async (req, res) => {
//   const { category } = req.params;

//   try {
//     const response = await axios.get(
//       `${URL}movie/${category}?api_key=${API_KEY}`
//     );

//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ message: "error fetching data" });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
