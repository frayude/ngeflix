import axios from "axios";

const getGenres = async (req, res) => {
  try {
    const apiKey = process.env.TMDB_API_KEY;

    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
    );

    res.json(response.data.genres);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetching Data", error: error.message });
  }
};

export default getGenres;
