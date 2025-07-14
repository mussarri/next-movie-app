import React from "react";
import style from "./hero.module.css";

function Hero({ isHome, title }) {
  return (
    <div className={style.hero + (isHome ? " h-144" : " h-96")}>
      <div className="absolute py-5 z-10 top-36 w-full">
        {isHome ? (
          <div className="max-w-7xl px-14 mx-auto ">
            <h1 className="text-5xl">Unlimited movies,</h1>
            <h1 className="text-5xl mt-3">TV shows, and more</h1>
            <h6 className="text-md mt-3">
              Find the latest and greatest movies and shows all avaible on
              Movie.
            </h6>
            <div className="flex gap-3 mt-8">
              <button className="bg-red-700 py-3 px-5 rounded-full">
                Get Startad
              </button>
              <button className="bg-white text-black py-3 px-5 rounded-full">
                Show Plans
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl px-14 mx-auto">
            <h1 className="text-6xl uppercase">{title}</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero;
