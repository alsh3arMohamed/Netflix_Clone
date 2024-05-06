import React, { useEffect, useState } from 'react';
import axios from 'axios';
import requests from './requests';
import './Banner.css';

const Banner = () => {
  const [bannerMovie, setBannerMovie] = useState(null);
  const imgUrl = "http://image.tmdb.org/t/p/original/";
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzdjMWYwMDQxMWVmMmE0YzFkMDZjN2Q5ZTRiYmM3ZCIsInN1YiI6IjY0YTgzZDE0OTY1MjIwMDEwMDExZDVkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Cp8p8RPxmWiIcqNJX5UlmRrzN_hoIaBfQ27CVhnpwRg"; // احل مكان YOUR_ACCESS_TOKEN_HERE بقيمة access token الخاصة بك
  useEffect(() => {
    async function fetchBannerMovie() {
      try {
        const response = await axios.get(requests.fetchNetflixOrignals, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = response.data;
        if (data.results && data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length);
          setBannerMovie(data.results[randomIndex]);
        }
      } catch (error) {
        // يمكنك معالجة الأخطاء هنا
        console.error('Error fetching data:', error);
      }
    }

    fetchBannerMovie();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substring(0, n - 1) + '...' : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: bannerMovie ? `url(${imgUrl + bannerMovie.backdrop_path})` :null,
        backgroundPosition: 'center center',
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{bannerMovie?.title || bannerMovie?.name || bannerMovie?.original_name}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">{truncate(bannerMovie?.overview, 150)}</h1>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
};

export default Banner;
