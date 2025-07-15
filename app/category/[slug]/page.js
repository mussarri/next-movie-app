import Image from "next/image";
import Link from "next/link";
import fetch from "node-fetch";
import React from "react";
import style from "../../components/MovieSlider/movieslider.module.css";
import Hero from "../../components/Hero/Hero.jsx";
import { options, titleize } from "../../../utils";
import Movie from "../../components/Movie";

const getMovieByCategory = async (id, lang = "en") => {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${lang}&page=1&sort_by=popularity.desc&with_genres=${id}`;
  const res = await fetch(url, options);
  return res.json();
};

export async function generateMetadata({ params, searchParams }) {
  const title = params.slug[0].toUpperCase() + params.slug.slice(1);
  return {
    title: title + " Movies",
  };
}

async function page({ params, searchParams }) {
  const data = await getMovieByCategory(searchParams.id, searchParams.lang);

  return (
    <>
      <Hero isHome={false} title={params.slug + " Movies"} />
      <div className="pt-10 max-w-6xl mx-auto">
        <div className="p-3 sm:p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-0 ">
          {data.results.map((item, idx) => (
            <Movie item={item} key={idx} />
          ))}
        </div>
      </div>
    </>
  );
}

export default page;
