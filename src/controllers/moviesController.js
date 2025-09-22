import axios from "axios";

const getMovies = async (req, res) => {
  try {
    const apiKey = process.env.TMDB_API_KEY;
    console.log(apiKey);

    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
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

export default getMovies;
