import React from "react";
import style from "./style.module.css"

function loading() {
  return (
    <div
      className={style.hero + " h-144"}
      style={{
        backgroundImage: "#000",
      }}
    >
      <div className="absolute p-5 z-10 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl">
            <h1 className="text-5xl">Loading</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default loading;
