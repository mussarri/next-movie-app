"use client";
import React, { useEffect, useState } from "react";
import fetch from "node-fetch";
import useMediaQuery from "@mui/material/useMediaQuery";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./movieslider.module.css";

import Movie from "../Movie";
import { options } from "@/utils";

function MovieSlider({ list, title }) {
  const [data, setData] = useState();
  const sm = useMediaQuery("(min-width:500px)");
  const md = useMediaQuery("(min-width:768px)");
  const lg = useMediaQuery("(min-width:1024px)");

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: lg ? 5 : md ? 4 : sm ? 3 : 2,
    slidesToScroll: 2,
    autoplay: true,
    speed: 8000,
    autoplaySpeed: 8000,
    cssEase: "linear",
    variableWidth: false,
    arrows: false,
    pauseOnHover: false,
  };

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${list}?language=en&page=1`;

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className={style.slider + " px-3 sm:px-5 mt-10 mx-auto max-w-6xl"}>
      <h2 className="p-21 text-3xl">{title} Movies</h2>
      <div className="my-5 w-full">
        <Slider {...settings}>
          {data?.results
            ? data.results.map((item) => (
                <div className="px-3 ">
                  <Movie key={item.id} item={item} />
                </div>
              ))
            : Array(20)
                .fill(0)
                .map((item) => (
                  <div className="p-4">
                    <div className="h-48">Loading...</div>
                  </div>
                ))}
        </Slider>
      </div>
    </div>
  );
}

export default MovieSlider;
