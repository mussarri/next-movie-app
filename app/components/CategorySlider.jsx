import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import fetch from "node-fetch";
import { getMultipleRandom, options } from "../../utils";

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 8,
  slidesToScroll: 4,
  cssEase: "linear",
  variableWidth: false,
  arrows: false,
  pauseOnHover: false,
};

const getCategories = async () => {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";

  const res = await fetch(url, options);
  return res.json();
};

async function CategorySlider() {
  const data = await getCategories();

  return (
    <>
      <div className="mt-14 lg:px-14 w-full">
        <div className="flex flex-wrap">
          {data?.genres &&
            getMultipleRandom(data.genres, 6).map((item, index) => (
              <div className="h-13 px-3 py-1 mx-auto" key={index}>
                <Link
                  href={{
                    pathname: "/category/" + item.name.toLowerCase(),
                    query: { id: item.id },
                  }}
                >
                  <div className="bg-gray-900 rounded-full p-3 px-10 text-lg text-center align-baseline text-gray-400 hover:text-white">
                    {item.name}
                  </div>
                </Link>
              </div>
            ))}
          <div className="h-13 px-3 py-1 mx-auto">
            <Link
              href={{
                pathname: "/category/all",
              }}
            >
              <div className="bg-gray-900 rounded-full p-3 px-10 text-lg text-center align-baseline text-gray-400">
                Other
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategorySlider;
