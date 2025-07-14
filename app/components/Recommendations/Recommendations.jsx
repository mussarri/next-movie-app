import Image from "next/image";
import Link from "next/link";
import React from "react";
import style from "../MovieSlider/movieslider.module.css";

const Recommendations = ({ data }) => {
  return (
    <div>
      <div className="pt-10 max-w-6xl mx-auto">
        <h2 className="text-2xl pl-5">Recommended Movies</h2>
        <div className="flex flex-wrap mt-5">
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
    </div>
  );
};

export default Recommendations;
