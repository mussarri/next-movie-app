"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from "./modal";

const index = ({ person_images, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(null);
  const [array, setArray] = useState([]);
  console.log(person_images);

  useEffect(() => {
    setArray(person_images?.profiles?.map((item) => item.file_path));
  }, [person_images]);

  const openModal = (img) => {
    setActiveImg(img);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="px-2 pr-4">
      <div className="p-1 flex justify-between items-end">
        <h2 className="text-xl text-white">Photos</h2>
        <span
          className="text-sm cursor-pointer text-gray-400"
          onClick={() => openModal(array[0])}
        >
          more
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 overflow-scroll ">
        {array.slice(0, 5)?.map((item, index) => (
          <div
            key={index}
            className="w-full h-auto relative bg-red-500 galery"
            style={{
              aspectRatio: 3 / 4,
            }}
          >
            <div className="overlay absolute top-0 left-0 w-full h-full bg-black/50"></div>
            <Image
              unoptimized
              alt=""
              src={"https://image.tmdb.org/t/p/w300" + item}
              fill
              className="cursor-pointer"
              onClick={() => {
                openModal(item);
              }}
            />
          </div>
        ))}

        {isOpen && array && activeImg && (
          <Modal
            array={array}
            name={name}
            closeModal={closeModal}
            activeImg={activeImg}
          />
        )}
      </div>
    </div>
  );
};

export default index;
