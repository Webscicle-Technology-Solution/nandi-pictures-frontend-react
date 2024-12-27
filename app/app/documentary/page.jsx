// Page.js (updated)
"use client";

import React from "react";
import ProfileShow from "@/app/component/homeComponents/ProfileShow";
import SearchBar from "@/app/component/homeComponents/SearchBar";
import FilmCardCarousel from "@/app/component/reuseable/FilmCardCarousel";

const Page = () => {
  return (
    <div className="flex flex-col justify-start items-start w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <SearchBar />
        <ProfileShow />
      </div>
      {/* Wrapping the carousel in a container for better layout control */}
    
        <h4 className="mt-10 ml-3">New Release</h4>
      <div className="flex items-center justify-center   overflow-visible">
        <FilmCardCarousel />
      </div>
      <h4 className="mt-8 ml-3">Trending Documentry</h4>
      <div className="flex items-center justify-center   overflow-visible">
        <FilmCardCarousel />
      </div>
      {/* </div> */}

    </div>
  );
};

export default Page;
