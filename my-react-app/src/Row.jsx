import React, { useEffect, useState } from 'react';
import axios from './axios';
import './Row.css';
import { base_url } from './constants.js';
import YouTube from "react-youtube"
import movieTrailer from "movie-trailer";



const baseUrl = "https://api.themoviedb.org/3";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzdjMWYwMDQxMWVmMmE0YzFkMDZjN2Q5ZTRiYmM3ZCIsInN1YiI6IjY0YTgzZDE0OTY1MjIwMDEwMDExZDVkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Cp8p8RPxmWiIcqNJX5UlmRrzN_hoIaBfQ27CVhnpwRg"; // احل مكان YOUR_ACCESS_TOKEN_HERE بقيمة access token الخاصة بك

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setMovies(request.data.results);
        return request;
      } catch (error) {
        // يمكنك معالجة الأخطاء هنا
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  const opts ={
    height:"390",
    width:"100%",
    playerVars:{

      autoplay:1,
    },
  };
const handleClick = (movie) => {
  if (trailerUrl) {
    setTrailerUrl('');
  } else {
    movieTrailer(movie?.name || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        const videoId = urlParams.get("v");
        setTrailerUrl(videoId);
      })
      .catch((error) => console.log(error));
  }
}

  console.table(movies);

  return (
    <div className="row">
      <h2>{title}</h2>
      
      <div className="row__posters">
        {/* Map through the movies array and display movie posters */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={()=> handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
      </div>
    
  );
};

export default Row;
