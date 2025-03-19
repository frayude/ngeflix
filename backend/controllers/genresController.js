const axios = require("axios");
const API_KEY = process.env.API_KEY;
const URL = process.env.URL;

const getGenres = async (req, res) => {
  try {
    const response = await axios.get(
      `${URL}genre/movie/list?api_key=${API_KEY}`
    );

    // const genreMap = data.genres.reduce((acc, genre) => {
    //   if (genre.id && genre.name) {
    //     acc[genre.id] = genre.name;
    //   }

    //   return acc;
    // }, {});
    res.json(response.data.genres);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Data" });
  }
};

module.exports = { getGenres };
