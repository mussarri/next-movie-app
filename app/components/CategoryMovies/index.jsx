"use client";
import { options } from "@/utils";
import React, { useEffect, useState } from "react";
import Movie from "../Movie";
import { useSearchParams } from "next/navigation";

const index = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";
  const id = searchParams.get("id") || 1;

  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${lang}&page=${page}&sort_by=popularity.desc&with_genres=${id}`;

  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setMovies((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      });
  }, [page]);

  return (
    <div className="pt-10 max-w-6xl mx-auto">
      <div className="p-3 sm:p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies &&
          movies.length > 0 &&
          movies.map((item, idx) => <Movie item={item} key={idx} />)}
      </div>
      <div className="w-full text-center">
        {page < totalPages && (
          <button
            className="rounded text-sm p-2 px-3 hover:shadow text-red-600"
            onClick={() => {
              page < totalPages && setPage(page + 1);
              setIsLoading(true);
            }}
            disabled={isLoading}
          >
            load more
          </button>
        )}
      </div>
    </div>
  );
};

export default index;
