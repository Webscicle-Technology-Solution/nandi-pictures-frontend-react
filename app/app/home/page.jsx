// Page.js (updated)
"use client";

import React from "react";
import FeaturedCarousel from "@/app/component/homeComponents/FeaturedCarousel";
import ProfileShow from "@/app/component/homeComponents/ProfileShow";
import SearchBar from "@/app/component/homeComponents/SearchBar";
import FilmCardCarousel from "@/app/component/reuseable/FilmCardCarousel";
import Link from "next/link";

const Page = () => {
  
  return (
    <div className="flex flex-col justify-start items-start w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <SearchBar />
        <ProfileShow />
      </div>
      {/* Wrapping the carousel in a container for better layout control */}
      <div className="mt-5">
        <FeaturedCarousel/>
      </div>

        <h4 className="mt-10 ml-3">Continue Watching</h4>
      <div className="flex items-center justify-center   overflow-visible">
        <FilmCardCarousel />
      </div>
      <h4 className="mt-8 ml-3">New Realses</h4>
      <div className="flex items-center justify-center   overflow-visible">
        <FilmCardCarousel />
      </div>
      <h4 className="mt-8 ml-3">Top Trending</h4>
      <div className="flex items-center justify-center overflow-visible">
        <FilmCardCarousel />
      </div>
      <div className="flex flex-row justify-between items-center w-full">
      <h4 className="mt-8 ml-3">Movies</h4>
      <Link href="/app/movies" className="text-blue-600 font-extralight underline hover:text-blue-800">View All</Link>
      </div>
      <div className="flex items-center justify-center overflow-visible">
        <FilmCardCarousel />
      </div>
      <div className="flex flex-row justify-between items-center w-full">
      <h4 className="mt-8 ml-3">TV Shows</h4>
      <Link href="/app/tvshows" className="text-blue-600 font-extralight underline hover:text-blue-800">View All</Link>
      </div>
      <div className="flex items-center justify-center overflow-visible">
        <FilmCardCarousel />
      </div>
      {/* </div> */}

    </div>
  );
};

export default Page;
