"use client";
import React, { useCallback, useRef, useState } from "react";
import Movie from "../Movie";

const index = ({ person_movies }) => {
  const [count, setCount] = useState(10);

  const observer = useRef();
  const lastPostElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setCount((prev) => prev + 10); // trigger loading of new posts by chaging page no
      }
    });

    if (node) observer.current.observe(node);
  }, []);

  return (
    <div className="mt-10  p-4  max-w-6xl mx-auto">
      <div className="p-1 pr-5 flex justify-between">
        <h2 className="text-3xl text-white">Movies</h2>
      </div>
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {person_movies?.cast
          .filter((item) => item.poster_path)
          .sort((a, b) => b.vote_average - a.vote_average)
          .slice(0, count)
          .map((movie, index) => (
            <Movie item={movie} key={movie.id} />
          ))}
        {count < person_movies.cast.length - 1 && (
          <div ref={lastPostElementRef}>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default index;
