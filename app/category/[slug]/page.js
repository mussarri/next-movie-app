import Image from "next/image";
import Link from "next/link";
import fetch from "node-fetch";
import React from "react";
import Hero from "../../components/Hero/Hero.jsx";
import { options } from "../../../utils";
import CategoryMovies from "../../components/CategoryMovies";

const getMovieByCategory = async (id, lang = "en", page = 1) => {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${lang}&page=${page}&sort_by=popularity.desc&with_genres=${id}`;
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
  return (
    <>
      <Hero isHome={false} title={params.slug + " Movies"} />
      <CategoryMovies />
    </>
  );
}

export default page;
