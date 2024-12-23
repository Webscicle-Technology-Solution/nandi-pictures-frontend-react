import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosPlayCircle } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import { BsBookmarkStarFill } from "react-icons/bs";

const FeaturedMovie = ({
  imageSrc = "/poster.jpg", // Default placeholder image
  title = "THE RISE OF SUDARSHAN CHAKRA", // Default title
  description = "A biopic on the journey of life of Jain Saint Shri Sudarshan Lal Ji Maharaj.", // Default description
  filmDetailUrl = "/details", // Default film detail URL
  watchUrl = "/watch", // Default watch URL
}) => {
  return (
    <div className="mr-3 ml-3 relative bg-gray-900 rounded-[25px] overflow-hidden  shadow-lg text-white border-[3px] border-solid border-[#e6ad35]">
      {/* Background Image */}

      <div className="relative w-[100%] h-[550px] ">
        <Image
          src={imageSrc}
          alt={title}
          fill
          objectFit="cover"
          className="opacity-80"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-2xl overflow-hidden"></div>

      {/* Title and Description */}
      <div className="absolute bottom-20 left-10 space-y-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-lg max-w-[600px]">{description}</p>

        {/* Buttons */}
        <div className="flex space-x-4">
          <Link
            href={filmDetailUrl}
            className="bg-[#D9D9D9] opacity-50 py-2 px-6 rounded-md text-black hover:opacity-80 flex flex-row gap-2 justify-center items-center"
          >
            <FaInfoCircle size={30} color="#0C0C0C" />
            Details
          </Link>
          <Link
            href={watchUrl}
            className="button-primary backprim flex flex-row justify-center items-center gap-2 "
          >
            <IoIosPlayCircle size={40} color="#0C0C0C" />
            <span className="text-[1.5rem] text-[#0C0C0C]">Watch Now</span>
          </Link>
        </div>
      </div>

      {/* Add to Favorite Button */}
      <button className="absolute top-5 right-0 bg-[#0c0c0c] p-3 rounded-l-full text-white hover:bg-gray-700 flex flex-row justify-center items-center gap-2 pl-5">
        <BsBookmarkStarFill size={25} />
        Add to Favorite
      </button>
    </div>
  );
};

export default FeaturedMovie;
