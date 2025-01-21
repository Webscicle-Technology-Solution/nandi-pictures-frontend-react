"use client";

import React, { useEffect, useState } from "react";
import FeaturedCarousel from "@/app/component/homeComponents/FeaturedCarousel";
import ProfileShow from "@/app/component/homeComponents/ProfileShow";
import SearchBar from "@/app/component/homeComponents/SearchBar";
import FilmCardCarousel from "@/app/component/reuseable/FilmCardCarousel";
import Link from "next/link";
import ContinueCarousel from "@/app/component/homeComponents/ContinueCarousel";
import useAuthStore from "@/app/(auth)/authStore";

const Page = () => {
  const [movies, setMovies] = useState([]);
  const { accessToken, isAuthenticated } = useAuthStore();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    // Log the current auth state
    console.log("Current Auth State:", {
      accessToken,
      isAuthenticated
    });

    const fetchMovies = async () => {
      if (!accessToken) {
        console.error("No access token found. Please log in.");
        return;
      }

      try {
        const response = await fetch(`${apiBaseUrl}/movies/allmovies`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          console.error(`Error: ${response.status} - ${errorMessage}`);

          if (response.status === 401 || response.status === 403) {
            // You might want to trigger a logout here
            useAuthStore.getState().logout();
          }
          return;
        }

        const data = await response.json();

        if (data.message === "All movies found successfully") {
          setMovies(data.allmovies);
        } else {
          console.error("Error: Movies data not found.");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    if (accessToken) {
      fetchMovies();
    }
  }, [accessToken, apiBaseUrl]);
  
  return (
    <div className="flex flex-col justify-start items-start w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <SearchBar />
        <ProfileShow />
      </div>
      
      <div className="mt-5">
        <FeaturedCarousel />
      </div>

      <h4 className="mt-10 ml-3">Continue Watching</h4>
      <div className="flex items-center justify-center overflow-visible">
        <ContinueCarousel />
      </div>

      <h4 className="mt-8 ml-3">New Releases</h4>
      <div className="flex items-center justify-center overflow-visible">
        <FilmCardCarousel movies={movies} />
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
    </div>
  );
};

export default Page;
