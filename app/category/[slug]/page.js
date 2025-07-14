import Image from "next/image";
import Link from "next/link";
import fetch from "node-fetch";
import React from "react";
import style from "../../components/MovieSlider/movieslider.module.css";
import Hero from "../../components/Hero/Hero.jsx";
import { options, titleize } from "../../../utils";

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-0 ">
          {data.results.map((item) => (
            <Link href={"/movie/" + item.id} className="w-full">
              <div className={style.movie}>
                <Image
                  unoptimized
                  width={200}
                  height={200}
                  alt="image"
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                />
                <div className="absolute bottom-0 left-0 w-full py-5 px-2 bg-gradient-to-t from-black to-transparent text-md">
                  <p>{item.title}</p>
                  <div className="flex justify-between text-lg">
                    <p>{item.release_date.split("-")[0]}</p>
                    <p>
                      {item.vote_average}
                      <span className="text-xs">/10</span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default page;
