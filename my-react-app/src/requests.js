const apiKey = "937c1f00411ef2a4c1d06c7d9e4bbc7d";
const baseUrl = "https://api.themoviedb.org/3";

const requests = {
  fetchTrending: `${baseUrl}/trending/all/week?${apiKey}&language=en-US`,
  fetchNetflixOrignals: `${baseUrl}/discover/tv?${apiKey}&with_networks=213`,
  fetchPopular: `${baseUrl}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&${apiKey}`,
  fetchActionMovies: `${baseUrl}/discover/movie?${apiKey}&with_genres=28`,
  fetchComedyMovies: `${baseUrl}/discover/movie?${apiKey}&with_genres=35`,
  fetchHorrorMovies: `${baseUrl}/discover/movie?${apiKey}&with_genres=27`,
  fetchRomanceMovies: `${baseUrl}/discover/movie?${apiKey}&with_genres=10749`,
  fetchDocumentaries: `${baseUrl}/discover/movie?${apiKey}&with_genres=99`,
  fetchTopRated: `${baseUrl}/movie/top_rated?${apiKey}`,
};

export default requests;
