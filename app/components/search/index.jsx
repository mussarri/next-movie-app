"use client";
import { useSearchParams, useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@mui/material";

const index = () => {
  const searchParams = useSearchParams();
  const sm = useMediaQuery("(min-width:600px)");

  const lang = searchParams.get("lang") || "en"; // default: en
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    document.querySelector("html").style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setIsOpen(false);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center rounded-lg gap-5 bg-black/50 p-2 h-[40px]"
    >
      <span
        className="cursor-pointer"
        onClick={() => {
          if (!sm) setIsOpen(!isOpen);
        }}
      >
        <SearchIcon />
      </span>
      {sm && (
        <input
          type="text"
          placeholder="Search"
          className="py-2 rounded bg-transparent outline-none"
          onChange={(e) => setQuery(e.target.value)}
        />
      )}
      {isOpen && !sm && (
        <div className="w-screen h-screen bg-black fixed top-0 left-0 p-3">
          <input
            type="text"
            placeholder="Search"
            className="py-2 rounded bg-gray-900 p-3 mt-5 text-white outline-none w-full"
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="w-full text-right">
            <button
              type="submit"
              className="p-2 px-5 bg-gray-900 text-white rounded mt-3 hover:shadow-sm shadow-zinc-400"
            >
              Go
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default index;
