import Image from "next/image";
import Link from "next/link";
import fetch from "node-fetch";
import React from "react";
import style from "../../components/MovieSlider/movieslider.module.css";
import Hero from "../../components/Hero/Hero.jsx";
import { options, titleize } from "../../../utils";

const getMovieByCategory = async (id) => {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`;
  const res = await fetch(url, options);
  return res.json();
};

async function page({ params, searchParams }) {

  const data = await getMovieByCategory(searchParams.id);

  return (
    <>
      <Hero isHome={false} title={titleize(params.slug) + " Movies"} />
      <div className="pt-10 max-w-6xl mx-auto">
        <div className="flex flex-wrap ">
          {data.results.map((item) => (
            <Link href={"/movie/" + item.id}>
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
