import { options } from "@/utils";
import { notFound } from "next/navigation";
import React from "react";
import Movie from "../components/Movie";
import Hero from "../components/Hero/Hero";
import Person from "../components/Person";

const getData = async (query, lang, page = 1) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=${lang}&page=${page}`,
    options
  );
  return res.json();
};

export const generateMetadata = async ({ params, searchParams }) => {
  if (!searchParams.q) return notFound();
  const title = searchParams.q[0].toUpperCase() + searchParams.q.slice(1);

  return {
    title,
  };
};

const page = async ({ params, searchParams }) => {
  if (!searchParams.q) return notFound();
  const res = await getData(
    searchParams.q,
    searchParams.lang,
    searchParams.page
  );
  if (res.results.length === 0) return notFound();

  const data = res.results.sort((a, b) => b.popularity - a.popularity);

  const movies = data
    .filter((item) => item.media_type === "movie")
    .filter((item) => item.poster_path)
    .sort((a, b) => b.vote_average - a.vote_average);

  const persons = data
    .filter((item) => item.media_type === "person")
    .filter((item) => item.profile_path);

  const tv = data
    .filter((item) => item.media_type === "tv")
    .filter((item) => item.poster_path)
    .sort((a, b) => b.vote_average - a.vote_average);

  return (
    <div>
      <Hero title={"Search Results of " + searchParams.q} />
      <div>
        {movies.length > 0 && (
          <div className="pt-10 max-w-6xl mx-auto">
            <h2 className="text-2xl pl-5">Results</h2>
            <div className="flex flex-wrap mt-5">
              {movies?.map((movie) => (
                <Movie item={movie} />
              ))}
              {tv.length > 0 &&
                tv?.map((item) => <Movie item={item} media_type={"tv"} />)}
              {persons.length > 0 &&
                persons?.map((item) => <Person item={item} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
