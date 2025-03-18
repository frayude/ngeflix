require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const movieRoutes = require("./routes/movies");

const app = express();
const PORT = 3000;

// middleware / fucntion yang dieksekusi sebelom request nyampe ke  endpoint
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

app.use("/movies", movieRoutes);
app.use("/genres", movieRoutes);

// Serve Frontend (Build Vite)
// app.use(express.static(path.join(__dirname, "dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

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
