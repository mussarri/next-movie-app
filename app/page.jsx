import CategorySlider from "./components/CategorySlider.jsx";
import Hero from "./components/Hero/Hero.jsx";

import MovieSlider from "./components/MovieSlider/MovieSlider.jsx";
import PopularActors from "./components/PopularActors";
import Random from "./components/Random";
export const metadata = {
  title: "Next Movie App",
  description: "",
};

export default async function Home() {
  return (
    <>
      <Hero isHome={true} />
      <CategorySlider />
      <Random />
      <MovieSlider list={"popular"} title={"Popular"} />
      <MovieSlider list={"top_rated"} title={"Top Rated"} />

      <PopularActors />
    </>
  );
}
