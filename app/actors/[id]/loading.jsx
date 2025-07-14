import Hero from "../../components/Hero/Hero";
import React from "react";

function loading() {
  return (
    <div>
      <Hero isHome={false} title={"Loading..."} />
    </div>
  );
}

export default loading;
