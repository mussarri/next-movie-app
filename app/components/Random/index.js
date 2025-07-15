import { options } from "../../../utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getTrendingMovies = async () => {
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  const res = await fetch(url, options);
  return res.json();
};

async function index() {
  const data = await getTrendingMovies();

  const movie = data?.results?.filter((item) => item.adult === false)[
    Math.round(Math.random() * 20)
  ];

  return (
    <>
      <div className="my-10 p-3 sm:p-5 max-w-6xl w-full mx-auto">
        <h1 className="text-3xl">Editor's Choice</h1>
        {movie && (
          <div className="pt-5 flex gap-5 w-full flex-col lg:flex-row">
            <Link href={"/movie/" + movie.id}>
              <div className="relative">
                <Image
                  unoptimized
                  width={500}
                  height={200}
                  alt="image"
                  src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
                />
              </div>
            </Link>
            <div className="text-gray-500 max-w-3xl p-2 flex flex-col">
              <Link href={"/movie/" + movie.id} className="text-2xl">
                {movie.title + " (" + movie.release_date.split("-")[0] + ")"}
              </Link>
              <p className="mt-2 max-w-2xl">{movie.overview}</p>
              <p className="mt-2">
                Language: {movie.original_language.toUpperCase()}
              </p>
              <div className="flex justify-between w-full">
                <p className="mt-2 text-3xl bottom-0 pb-2">
                  {movie.vote_average.toFixed(1)}
                  <span className="text-xl">/10</span>{" "}
                </p>
                <div className="mt-2  bottom-0 p-2 right-10">
                  <button className="rounded-full bg-red-700 py-2 px-4 text-gray-300 hover:text-white">
                    Watch now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default index;
