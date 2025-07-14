"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import { languages } from "../../utils";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";

function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const searchParams = useSearchParams();
  console.log(searchParams);

  const lang = searchParams.get("lang") || "en"; // default: en

  const router = useRouter();
  const pathname = usePathname();

  const setLang = (lang) => {
    const params = new URLSearchParams(searchParams);
    params.set("lang", lang);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setLang(lang);
  }, [lang]);

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

  return (
    <header
      className={
        "p-5 pr-10 h-[80px] lg:h-20 fixed top-0 z-40 w-full mx-auto transition-colors ease-in-out duration-300" +
        (scrollPosition > 50 ? " bg-gray-900" : " bg-transparent")
      }
    >
      <div className="flex justify-between items-center lg:max-w-6xl mx-auto">
        <Link href={"/"}>
          <div className="logo text-3xl text-red-600 font-bold">MOVIE APP</div>
        </Link>

        <div className="flex gap-2 items-center">
          <div className="relative" ref={ref}>
            <div
              className="flex gap-1 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Image src={"/svg/" + lang + ".svg"} width={20} height={20} />
              <KeyboardArrowDownIcon />
            </div>
            {isOpen && (
              <div className="z-10 absolute grid grid-cols-2 gap-2 bg-gray-700 rounded p-2 w-[80px] h-[200px] overflow-y-auto">
                {languages.map((item) => (
                  <div
                    className="cursor-pointer w-full h-[20px] relative"
                    onClick={() => {
                      setLang(item.iso_639_1);
                      setIsOpen(false);
                    }}
                  >
                    <Image
                      src={"/svg/" + item.iso_639_1 + ".svg"}
                      fill
                      alt={item.english_name}
                      className="text-xs"
                      onError={(e) => {
                        e.target.parentElement.style.display = "none";
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center rounded-lg gap-5 bg-black/50 p-2 h-[40px]">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search"
              className="py-2 rounded bg-transparent outline-none"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
