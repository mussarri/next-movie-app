"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DownloadIcon from "@mui/icons-material/Download";

const modal = ({ name, activeImg, array, closeModal }) => {
  const ref = useRef();
  const [activeIndex, setActiveIndex] = useState(array.indexOf(activeImg));

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        closeModal();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % array.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + array.length) % array.length);
  };

  useEffect(() => {
    document.querySelector("html").style.overflow = "hidden";
    return () => {
      document.querySelector("html").style.overflow = "visible";
    };
  }, []);

  const handleDownload = async () => {
    const res = await fetch(
      "https://image.tmdb.org/t/p/w300" + array[activeIndex]
    );
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = name + ".jpg";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`w-screen h-screen bg-black/80 top-[0px] left-0 fixed flex flex-col justify-center items-center overflow-hidden px-3`}
      style={{ zIndex: 1000 }}
    >
      <div
        className="w-full max-w-[700px] relative h-[100%] my-10 flex justify-around items-center rounded-lg bg-black shadow-lg shadow-red-500 inset-shadow-blue-900"
        ref={ref}
      >
        <div className="absolute top-5 right-5 z-20 flex gap-3">
          <button onClick={handleDownload}>
            <DownloadIcon />
          </button>
          <button onClick={() => closeModal()}>
            <CloseIcon />
          </button>
        </div>
        <h2 className="absolute bottom-0 w-full text-center text-2xl font-semibold z-10 bg-black/50 rounded p-4 px-3 text-white">
          {name?.toUpperCase()}
        </h2>
        <button onClick={prev}>
          <ChevronLeftIcon />
        </button>
        <div
          className="relative bg-red-100"
          style={{ aspectRatio: "2/3", height: "100%" }}
        >
          <Image
            unoptimized
            alt=""
            src={"https://image.tmdb.org/t/p/w300" + array[activeIndex]}
            fill
            className="cursor-pointer"
          />
        </div>
        <button onClick={next}>
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
};

export default modal;
