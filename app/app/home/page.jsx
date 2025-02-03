"use client";

import React, { useEffect, useState } from "react";
import FeaturedCarousel from "@/app/component/homeComponents/FeaturedCarousel";
import ProfileShow from "@/app/component/homeComponents/ProfileShow";
import SearchBar from "@/app/component/homeComponents/SearchBar";
import FilmCardCarousel from "@/app/component/reuseable/FilmCardCarousel";
import Link from "next/link";
import useAuthStore from "@/app/(auth)/authStore";
import { usePathname } from "next/navigation";
import { RiMovie2Fill } from "react-icons/ri";
import { TbDeviceTvOldFilled } from "react-icons/tb";
import { BiSolidCameraMovie } from "react-icons/bi";
import { IoIosFilm } from "react-icons/io";
import { SiApplemusic } from "react-icons/si";
import SkeletonLoader from "@/app/component/reuseable/filmcardskelton";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState('movies');

  // Function to handle category selection
  // const handleCategoryClick = (category) => {
  //   setSelectedCategory(category);
  // };

  const pathname = usePathname();

  let conditionResult = "";

  if (pathname.includes("/app/")) {
    const extractedWord = pathname.split("/app/")[1];
    conditionResult = extractedWord.split("/")[0];
  }

  const [movies, setMovies] = useState([]);
  const [user,setUser] = useState(null)

  // const user =useAuthStore((state)=>state.user)

  const checkAuth = useAuthStore((state) => state.checkAuth);

  const subscriptionPlan = useAuthStore((state) => state.subscriptionPlan); // Get subscription plan from store
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchMovies = async () => {
      // if (!accessToken) {
      //   console.log("No access token available");
      //   return;
      // }

      try {
        console.log("Using access token:", accessToken); // Debug log
        // console.log("user:",user.email)
        console.log("user:",subscriptionPlan)

        
        const response = await fetch(`${apiBaseUrl}/movies/allmovies`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'token': `${accessToken}`
          },  
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.message === "All movies founded successfully") {
          setMovies(data.allmovies);
        } else {
          console.error("Error: Movies data not found.");
        }
        
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [accessToken, apiBaseUrl]);

  useEffect(() => {
    const fetchuser = async () => {
      if (!isAuthenticated) {
        console.log("No access token available");
        return;
      }

      try {
       const response = await checkAuth();

        if (!response) {
          console.error("Error: User data not found.");
        }else{
          setUser(response)
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }

    }
    fetchuser();
  },[isAuthenticated,checkAuth])

  // Skeleton Loading Component



  return (
    <div className="flex flex-col justify-start items-start w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <SearchBar />
        <ProfileShow />
      </div>
      
      <div className="mt-5">
        <FeaturedCarousel />
      </div>
      {/*Cateogary section */}
      <div className="flex flex-row gap-5 mt-8 mb-5 ">
      <Link
          href="/app/home/movies"
          className={`bg-gray-200 rounded-xl px-10 py-3 flex items-center gap-3  shadow-sm`}
        >
          <RiMovie2Fill size={22} />
          <h4>Movies</h4>
        </Link>
        <Link
          href="/app/home/tvshows"
          className={` bg-gray-200 rounded-xl px-10 py-3 flex items-center gap-3  shadow-sm`}
        >
          <TbDeviceTvOldFilled size={22} />
          <h4>TV Series</h4>
        </Link>

        <Link
          href="/app/home/shortfilm"
          className={` bg-gray-200 rounded-xl px-10 py-3 flex items-center gap-3  shadow-sm`}
        >
          <IoIosFilm size={22} />
          <h4>Short Film</h4>
        </Link>

        <Link
          href="/app/home/documentary"
          className={`bg-gray-200 rounded-xl px-10 py-3 flex items-center gap-3  shadow-sm`}
        >
          <BiSolidCameraMovie size={22} />
          <h4>Documentary</h4>
        </Link> 

       <Link
          href="/app/home/music"
          className={` bg-gray-200 rounded-xl px-10 py-3 flex items-center gap-3  shadow-sm`}
        >
          <SiApplemusic size={22} />
          <h4>Music</h4>
        </Link> 
      </div>

      <h4 className="mt-8 ml-3">New Releases</h4>
      <div className="flex items-center justify-center overflow-visible">
        {isLoading ? (
          <div className="flex space-x-4">
            <div className="w-72 h-[400px] bg-gray-200 animate-pulse"></div>
            <div className="w-72 h-[400px] bg-gray-200 animate-pulse"></div>
            <div className="w-72 h-[400px] bg-gray-200 animate-pulse"></div>
            <div className="w-72 h-[400px] bg-gray-200 animate-pulse"></div>

          </div>
        ): (
          <FilmCardCarousel movies={movies} vidType={"movies"} />
        )}
        
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
