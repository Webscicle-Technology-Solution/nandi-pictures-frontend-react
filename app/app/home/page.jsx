// Page.js (updated)
"use client";

import React from "react";
import FeaturedCarousel from "@/app/component/homeComponents/FeaturedCarousel";
import ProfileShow from "@/app/component/homeComponents/ProfileShow";
import SearchBar from "@/app/component/homeComponents/SearchBar";
import Image from "next/image";
import FilmCard from "@/app/component/reuseable/FilmCard";
import FilmCardCarousel from "@/app/component/reuseable/FilmCardCarousel";

const Page = () => {
  const movieList = [
    {
      imageSrc: "/poster.jpg", // Default placeholder image
      title: "THE RISE OF SUDARSHAN CHAKRA", // Default title
      showContinueWatch: true, // Show or hide Continue Watch
      showStar: true, // Show or hide Star button
      filmDetailUrl: "/login", // Default film detail URL
    },

    {
      imageSrc: "/poster.jpg", // Default placeholder image
      title: "THE 2", // Default title
      showContinueWatch: true, // Show or hide Continue Watch
      showStar: true, // Show or hide Star button
      filmDetailUrl: "/login", // Default film detail URL
    },
    {
      imageSrc: "/poster.jpg", // Default placeholder image
      title: "THE 3", // Default title
      showContinueWatch: true, // Show or hide Continue Watch
      showStar: true, // Show or hide Star button
      filmDetailUrl: "/login", // Default film detail URL
    },
  ];
  return (
    <div className="flex flex-col justify-start items-start w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <SearchBar />
        <ProfileShow />
      </div>
      {/* Wrapping the carousel in a container for better layout control */}
      <div className="mt-5">
        <FeaturedCarousel />
      </div>

      {/* <div className='mt-10 p-3 flex flex-col gap-5'>
        <h4>Continue Watching</h4>
      <div className='flex gap-8 mb-8'>
       {movieList.map((item, index) => ( // Use map to render FilmCard components for each item in the movieList array
        <FilmCard key={index} {...item} /> // Pass the item as props to the FilmCard component
      ))}
      </div>
       
      </div> */}
      <div className="flex items-center justify-center mt-10  overflow-visible">
        <FilmCardCarousel />
      </div>
    </div>
  );
};

export default Page;
