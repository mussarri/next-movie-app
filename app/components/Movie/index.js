import Image from "next/image";
import Link from "next/link";
import React from "react";
import { date } from "../../../utils/index";
import style from "./style.module.css";

function Movie({ item }) {
  return (
    <Link href={"/movie/" + item.id} className="h-full">
      <div className={style.movie}>
        <Image
          unoptimized
          width={200}
          height={200}
          alt="image"
          src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
        />
        <div className="absolute bottom-0 left-0 w-full py-5 px-2 bg-gradient-to-t from-black to-transparent pt-2 text-md">
          <p>{item.title}</p>
          <div className="flex justify-between text-lg">
            <p>{date(item.release_date)}</p>
            <p>
              {item.vote_average.toFixed(1)}
              <span className="text-xs">/10</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Movie;
