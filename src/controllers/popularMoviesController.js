import axios from "axios";

const getPopularMovies = async (req, res) => {
  try {
    const apiKey = process.env.TMDB_API_KEY;

    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
    );

    res.json(response.data.results);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error fetching data", error: error.message });
  }
};

export default getPopularMovies;
