import Image from "next/image";
import Link from "next/link";
import React from "react";
import style from "../MovieSlider/movieslider.module.css";
import Movie from "../Movie";

const Recommendations = ({ data }) => {
  return (
    <div>
      <div className="pt-10 max-w-6xl mx-auto">
        <h2 className="text-2xl pl-4">Recommended Movies</h2>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-5">
          {data.results.map((item, idx) => (
            <Movie item={item} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
