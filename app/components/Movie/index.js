"use client";

import Image from "next/image";
import Link from "next/link";
import React, { use } from "react";
import { date } from "../../../utils/index";
import style from "./style.module.css";
import { useMediaQuery } from "@mui/material";

function Movie({ item, media_type = "movie" }) {
  const sm = useMediaQuery("(max-width:640px)");
  return sm ? (
    <Mobile item={item} media_type={media_type} />
  ) : (
    <Web item={item} media_type="movie" />
  );
}

export default Movie;

function Mobile({ item, media_type = "movie" }) {
  return (
    <Link
      href={(media_type === "movie" ? "/movie/" : "/tv/") + item.id}
      className="w-full"
    >
      <div
        className="relative p-3 rounded-lg overflow-hidden"
        style={{
          aspectRatio: 2 / 3,
        }}
      >
        <Image
          unoptimized
          fill
          alt="image"
          src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
        />
      </div>
    </Link>
  );
}

function Web({ item, media_type = "movie" }) {
  return (
    <Link
      href={(media_type === "movie" ? "/movie/" : "/tv/") + item.id}
      className="w-full"
    >
      <div className={style.movie}>
        <Image
          unoptimized
          fill
          alt="image"
          src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
        />
        <div className="absolute bottom-0 left-0 w-full py-5 px-2 bg-gradient-to-t from-black to-transparent pt-2 text-md ">
          <p>{item.title || item.name}</p>
          <div className="flex justify-between text-lg">
            <p>{date(item.release_date || item.first_air_date || "")}</p>
            <p>
              {item.vote_average?.toFixed(1)}
              <span className="text-xs">/10</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
