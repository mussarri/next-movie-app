import { date, options, titleize } from "../../../utils";
import fetch from "node-fetch";
import React, { Suspense } from "react";
import style from "./style.module.css";
import { Rating } from "@mui/material";
import Recommendations from "@/app/components/Recommendations/Recommendations";
import Similar from "@/app/components/Similar/index";
import Link from "next/link";

export async function generateMetadata({ params, searchParams }) {
  const id = params.id;
  const lang = searchParams?.lang || "en"; // default: en
  const movie = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=${lang}`,
    options
  ).then((res) => res.json());
  return {
    title: movie.title,
    description: movie.description,
  };
}

async function page({ params, searchParams }) {
  const id = params.id;

  const lang = searchParams?.lang || "en"; // default: en
  const res = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?language=${lang}`,
      options
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=${lang}`,
      options
    ),
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=${lang}`, options),
  ]);

  const [recommendations, similar, movie] = await Promise.all(
    res.map((res) => res.json())
  );

  return (
    <div>
      <div
        className={style.hero + " h-144 overflow-hidden"}
        style={{
          backgroundImage: movie.backdrop_path
            ? `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`
            : "url(https://cdn.pixabay.com/photo/2013/03/08/05/28/filmstrip-91434_1280.jpg)",
        }}
      >
        <div className="absolute py-5  z-10 w-full">
          <div className="p-3 sm:p-5 max-w-6xl mx-auto">
            <div className="max-w-xl">
              <h1 className="text-5xl">
                {titleize(movie.title) + " (" + date(movie.release_date) + ")"}
              </h1>

              <div className="p-2 mt-3 text-3xl">
                <Rating
                  name="read-only"
                  value={movie.vote_average / 2}
                  readOnly
                />
                <span className="ml-2">{movie.vote_average.toFixed(1)}</span>
              </div>
              <p className="mt-3 p-2 text-gray-400 text-sm md:text-md">
                {movie.overview}
              </p>
              <div className="m-2 flex gap-2">
                {movie.genres.map((item, idx) => (
                  <Link
                    key={idx}
                    href={`/category/${item.name.toLowerCase()}?id=${item.id}`}
                    className="p-1 px-3 bg-slate-600 rounded-xl text-xs"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="m-2 mt-4">
                <button className="rounded-full bg-red-800 p-2 text-lg px-10 text-gray-300 hover:text-white">
                  Play
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Recommendations data={recommendations} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Similar data={similar} />
      </Suspense>
    </div>
  );
}

export default page;
