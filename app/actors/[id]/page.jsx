import Hero from "../../components/Hero/Hero";

import Image from "next/image";
import fetch from "node-fetch";
import React from "react";
import PersonMovies from "../../components/PersonMovies";
import { options } from "../../../utils";
import PersonGallery from "../../components/PersonGallery";

const getActor = async (person_id, lang) => {
  const url = `https://api.themoviedb.org/3/person/${person_id}?language=${lang}`;
  const url2 = `https://api.themoviedb.org/3/person/${person_id}/movie_credits?language=${lang}`;
  const url3 = `https://api.themoviedb.org/3/person/${person_id}/images?language=${lang}`;

  const lists = await Promise.all(
    [url, url2, url3].map(async (url) => {
      const res = await fetch(url, options);
      return res.json();
    })
  );

  return lists;
};

export async function generateMetadata({ params, searchParams }) {
  const id = params.id;
  const lang = searchParams?.lang || "en"; // default: en

  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}?language=${lang}`,
    options
  );
  const actor = await res.json();

  return {
    title: actor.name,
    description: actor.biography,
  };
}

async function page({ params, searchParams }) {
  const lang = searchParams?.lang || "en";
  const [person, person_movies, person_images] = await getActor(
    params.id,
    lang
  );

  return (
    <div>
      <Hero isHome={false} title={person?.name} />
      <h2 className="px-4 mt-10 max-w-6xl mx-auto text-3xl text-white">
        Biograpyh
      </h2>
      <div className="flex p-4 max-w-6xl mx-auto text-gray-400">
        <div className="flex flex-col gap-4">
          <p
            className="p-1 mt-2 text-sm sm:text-[16px]"
            style={{ maxHeight: 400, overflow: "scroll" }}
          >
            {Array.isArray(person?.biography)
              ? person?.biography.split("\n").map((item, idx) => {
                  return (
                    <React.Fragment key={idx}>
                      {item}
                      <br />
                    </React.Fragment>
                  );
                })
              : person?.biography}
          </p>
          {person_images?.profiles.length > 0 && (
            <PersonGallery person_images={person_images} name={person?.name} />
          )}
        </div>
        <div className="min-w-[200px] sm:min-w-[300px] hidden md:block">
          <div className="p-2 bg-gray-900 rounded">
            <Image
              width={300}
              height={200}
              unoptimized
              alt="image"
              src={`https://image.tmdb.org/t/p/w300${person?.profile_path}`}
            />
            <p className="mt-3 text-lg text-right">{person?.place_of_birth}</p>
            <p className="mt-1 text-lg text-right">
              Birthday: {person?.birthday}
            </p>
          </div>
        </div>
      </div>

      <PersonMovies person_movies={person_movies} />
    </div>
  );
}

export default page;
