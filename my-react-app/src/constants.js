import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

const base_url = 'https://image.tmdb.org/t/p/original/';

export { instance, base_url };
