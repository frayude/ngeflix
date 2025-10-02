import axios from "axios";

const getNewMoviesThisMonth = async (req, res) => {
  try {
    const apiKey = process.env.TMDB_API_KEY;
    // Format Date: new Date(tahun, bulan, hari, jam, menit, detik, milidetik)
    // Buat tanggal saat ini
    const date = new Date();

    // Ambil tahun sekarang
    const thisYear = date.getFullYear();

    // Tanggal pertama bulan ini
    // getMonth() = bulan sekarang, 1 = hari pertama
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    // Tanggal terakhir bulan ini
    // getMonth() + 1 = bulan berikutnya, 0 = mundur satu hari dari tanggal 1, bisa jadi antara 31,30,29 sesuai dengan bulan
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?release_year=${thisYear}&primary_release_date.gte=${firstDay}&primary_release_date.lte=${lastDay}&api_key=${apiKey}`
    );

    // mengurutkan dari tanggal awal dan sort data jadi 12
    const sortedMovies = response.data.results
      .sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
      .slice(0, 12);

    res.json(sortedMovies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error fetching data", error: error.message });
  }
};

export default getNewMoviesThisMonth;
