"use client";
import React, { useEffect, useState } from "react";
import fetch from "node-fetch";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./movieslider.module.css";

import Movie from "../Movie";

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 2,
  autoplay: true,
  speed: 8000,
  autoplaySpeed: 8000,
  cssEase: "linear",
  variableWidth: false,
  arrows: false,
  pauseOnHover: false,
  variableWidth: true,
};

function MovieSlider({ list, title }) {
  const [data, setData] = useState();

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${list}?language=en&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_KEY,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className={style.slider + " px-5 lg:px-14 mt-10 mx-auto max-w-7xl"}>
      <h2 className="p-21 text-3xl">{title} Movies</h2>
      <div className="my-5 w-full">
        <Slider {...settings}>
          {data?.results
            ? data.results.map((item) => <Movie item={item} />)
            : Array(10)
                .fill(0)
                .map((item) => (
                  <div className="p-4">
                    <div className="h-48">Loading</div>
                  </div>
                ))}
        </Slider>
      </div>
    </div>
  );
}

export default MovieSlider;
