import Image from "next/image";
import Link from "next/link";
import fetch from "node-fetch";
import React from "react";
import style from "./style.module.css";
import { options } from "../../../utils";
import { useSearchParams } from "next/navigation";

export const getPopularActors = async (lang) => {
  const url = `https://api.themoviedb.org/3/person/popular?language=${lang}&page=1`;
  const res = await fetch(url, options);
  return res.json();
};

async function PopularActors() {
  const data = await getPopularActors("en");
  return (
    <div className="px-14 mt-20 mx-auto max-w-7xl">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="col-span-2 pt-10 p-2">
          <div className="bg-gray-900 p-3 h-full flex flex-col gap-1">
            <p className="text-5xl text-red-600">Top 10</p>
            <p className="text-3xl font-bold">Hollywood Actors</p>
            <p className="text-sm text-gray-400 ">
              in this{" "}
              <span className=" decoration-red-600 decoration-solid decoration-1 underline">
                month
              </span>
            </p>
            <div className="text-right">
              <Link
                href={"/actors"}
                className="outline outline-offset-2 outline-1 text-sm px-2 text-right"
              >
                view all
              </Link>
            </div>
          </div>
        </div>
        {data?.results?.slice(0, 10).map((actor, i) => (
          <Link href={"/actors/" + actor.id}>
            <div className={style.actor + " relative"}>
              <Image
                unoptimized
                width={200}
                height={200}
                alt="image"
                src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
              />
              <div className="absolute bottom-0 pt-4 px-2 w-full bg-gradient-to-t from-black to-transparent">
                {actor.name}
              </div>
            </div>
          </Link>
        ))}
        <div className="col-span-2">
          <div
            className="text-center top-2/4 left-2/4 relative"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <Link
              href={"/actors"}
              className="outline outline-offset-1 outline-1 text-sm px-4 py-2 text-right"
            >
              view all
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularActors;
