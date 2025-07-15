import Hero from "@/app/components/Hero/Hero";
import fetch from "node-fetch";
import React from "react";
import { getPopularActors } from "../components/PopularActors";
import Image from "next/image";
import Link from "next/link";
import style from "./style.module.css";
import { options, slugify } from "../../utils";

const searchPeople = async () => {
  const url =
    "https://api.themoviedb.org/3/search/person?include_adult=false&language=en-US&page=1";

  const res = await fetch(url, options);
};

export async function generateMetadata({ params, searchParams }) {
  return {
    title: "Actors",
    description: "Actors page",
  };
}

async function page() {
  const data = await getPopularActors();

  return (
    <div>
      <Hero isHome={false} title={"actors"} />
      <div className="p-10 max-w-4xl mx-auto">
        <label
          htmlFor="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <form class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="outline-none block w-full p-4 pl-10 text-sm text-gray-900  rounded-lg bg-gray-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search actors..."
            required
          />
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5
            bg-red-900 p-3 hover:bg-red-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
          >
            Search
          </button>
        </form>
      </div>
      <div className="p-7 grid grid-cols-5 gap-8">
        {data.results.map((actor) => (
          <Link href={"/actors/" + actor.id}>
            <div className={style.actor + " relative"}>
              <Image
                unoptimized
                width={250}
                height={200}
                alt="image"
                src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
              />
              <div className="absolute bottom-0 pt-4 px-2 w-full bg-gradient-to-t from-black to-transparent text-xl">
                {actor.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-5 text-right pr-7">
        <button className="bg-red-900 p-3 rounded">Next page</button>
      </div>
    </div>
  );
}

export default page;
