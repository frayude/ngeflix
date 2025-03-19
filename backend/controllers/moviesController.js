const axios = require("axios");
const API_KEY = process.env.API_KEY;
const URL = process.env.URL;

const getMovies = async (req, res) => {
  try {
    const response = await axios.get(
      `${URL}trending/movie/day?api_key=${API_KEY}`
    );

    const data = response.data.results;

    // ambil 5 film dan urutkan berdasarkan vote tertinggi
    const sortedMovies = data
      .slice(0, 5)
      .sort((a, b) => b.vote_count - a.vote_count);

    res.json(sortedMovies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
};

module.exports = { getMovies };
