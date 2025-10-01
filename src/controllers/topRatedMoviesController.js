import axios from "axios";

const getTopRatedMovies = async (req, res) => {
  try {
    const apiKey = process.env.TMDB_API_KEY;

    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
    );

    // ambil 5 film dan urutkan berdasarkan vote tertinggi
    const sortedMovies = response.data.results.slice(0, 12);

    res.json(sortedMovies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error fetching data", error: error.message });
  }
};

export default getTopRatedMovies;
