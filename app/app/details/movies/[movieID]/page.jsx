"use client"
import React, { useState, useEffect } from 'react';
import { IoIosPlayCircle } from 'react-icons/io';
import { BsBookmarkStarFill } from 'react-icons/bs';
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/app/(auth)/authStore";
import Image from 'next/image';
import getMovieAction from '@/app/utils/getMovieAction';

// Skeleton Loading Component
const MovieSkeleton = () => (
  <div className="ml-10 mr-5 animate-pulse">
    {/* Title Skeleton */}
    <div className="h-[35px] w-1/3 bg-gray-300 rounded mb-3" />

    {/* Banner Skeleton */}
    <div className="relative w-[55vw] h-[350px] bg-gray-300 rounded-2xl" />
    
    {/* Buttons Skeleton */}
    <div className="flex flex-row mt-5 gap-5">
      <div className="h-14 w-48 bg-gray-300 rounded-xl" />
      <div className="h-14 w-48 bg-gray-300 rounded-xl" />
    </div>

    {/* Movie Info Skeleton */}
    <div className="!text-[1.2rem]">
      {/* Rating and Details */}
      <div className="flex flex-row gap-3 mt-5 items-center">
        <div className="h-6 w-24 bg-gray-300 rounded" />
        <div className="h-6 w-2">|</div>
        <div className="h-6 w-16 bg-gray-300 rounded" />
        <div className="h-6 w-2">|</div>
        <div className="h-6 w-32 bg-gray-300 rounded" />
        <div className="h-6 w-2">|</div>
        <div className="h-6 w-48 bg-gray-300 rounded" />
      </div>

      {/* Director and Production Info Skeleton */}
      <div className="flex flex-row gap-3 mt-3 items-center">
        <div className="h-6 w-64 bg-gray-300 rounded" />
        <div className="h-6 w-2">|</div>
        <div className="h-6 w-64 bg-gray-300 rounded" />
      </div>

      {/* Actors Skeleton */}
      <div className="flex flex-row gap-3 mt-3 items-center">
        <div className="h-6 w-96 bg-gray-300 rounded" />
      </div>

      {/* Description Skeleton */}
      <div className="mt-3">
        <div className="h-6 w-32 bg-gray-300 rounded mb-3" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-[95%]" />
          <div className="h-4 bg-gray-300 rounded w-[90%]" />
        </div>
      </div>
    </div>
  </div>
);

const MoviePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const movieID = pathname.split("/").pop();
  
  const { accessToken, isAuthenticated, checkAuth } = useAuthStore();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [movie, setMovie] = useState(null);
  const [buttonText, setButtonText] = useState("Watch Now");
  const [isLoading, setIsLoading] = useState(true);
  const [userSubscription, setUserSubscription] = useState(null);

  // Fetch movie details
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${apiBaseUrl}/movies/viewmovie?id=${movieID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: accessToken,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { message, moviedetails } = await response.json();
        
        if (message === "Movie found successfully") {
          setMovie(moviedetails);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [accessToken, apiBaseUrl, movieID]);

  // Fetch user subscription
  useEffect(() => {
    const fetchUserSubscription = async () => {
      if (!isAuthenticated) {
        setUserSubscription(null);
        setIsLoading(false);
        return;
      }

      try {
        const response = await checkAuth();
        if (response?.user?.subscriptionId?.subscriptionTypeId?.name) {
          setUserSubscription(response.user.subscriptionId.subscriptionTypeId.name);
        }
      } catch (error) {
        console.error("Error fetching user subscription:", error);
        setUserSubscription(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserSubscription();
  }, [isAuthenticated, checkAuth,setUserSubscription]);

  // Update button text based on movie and subscription
  useEffect(() => {
    if (!movie || isLoading) return;

    const action = getMovieAction(movie, userSubscription);
    const actionToText = {
      login: "Login to Watch",
      rent: "Rent this Movie",  // Updated text
      subscribe: "Subscribe to Watch this Movie",  // Updated text
      watchNow: "Watch Now"
    };

    setButtonText(actionToText[action] || "Watch Now");
  }, [movie, userSubscription, isLoading]);

  // Handle watch button click
  const handleWatchNow = () => {
    const action = getMovieAction(movie, userSubscription);
    const actionRoutes = {
      error: { path: '/error', message: 'Error: Movie details not found' },
      login: { 
        path: '/login', 
        message: 'Please log in to continue watching!' 
      },
      subscribe: { 
        path: 'app/subscribe', 
        message: 'You need a premium subscription to watch this movie!' 
      },
      rent: { 
        path: `/app/rent/${movie._id}`, 
        message: 'This movie is available for rent!' 
      },
      watchNow: { 
        path: `app/watch/movie/${movie._id}` 
      },
    };

    const route = actionRoutes[action];
    if (route.message) {
      alert(route.message);
    }
    router.push(route.path);
  };

  if (!movie || isLoading) {
    return <MovieSkeleton />;
  }

  const { 
    title, 
    certificate, 
    durationHours, 
    durationMinutes, 
    genres, 
    castDetails, 
    description 
  } = movie;
  
  console.log('Movie details:', {
    isRentable: movie.isRentable,
    isFree: movie.isFree,
    subscription: userSubscription
  });

  return (
    <div className="ml-10 mr-5">
      <h1 className="text-[35px] mb-3">{title}</h1>

      <div className="relative w-[55vw] h-[350px]">
        <Image
          src="/banner-placeholder.png"
          alt="Movie Banner"
          fill
          objectFit="contain"
          className="rounded-2xl justify-center"
        />
      </div>
      
      <div className="flex flex-row mt-5 gap-5">
        <button
          onClick={handleWatchNow}
          className="button-primary backprim flex flex-row justify-center items-center gap-2"
        >
          <IoIosPlayCircle size={40} color="#0C0C0C" />
          <span className="text-[1.5rem] text-[#0C0C0C]">{buttonText}</span>
        </button>
        
        <button className="bg-[#0c0c0c] p-3 rounded-xl text-white hover:bg-gray-700 flex flex-row justify-center items-center gap-2 pl-5">
          <BsBookmarkStarFill size={25} />
          Add to Favorite
        </button>
      </div>

      <div className="!text-[1.2rem]">
        <div className="flex flex-row gap-3 mt-5 items-center">
          <h4 className="text-[1rem]">
            Rating: <span className="text-[#e6ad35] font-bold">6.5</span>
          </h4>
          <h3>|</h3>
          <h4 className="font-bold">{certificate}</h4>
          <h3>|</h3>
          <h4>
            Duration:{" "}
            <span className="text-[#e6ad35] font-bold">
              {durationHours} hrs {durationMinutes} min
            </span>
          </h4>
          <h3>|</h3>
          <h4 className="font-bold">
            {genres.map(genre => genre.name).join(", ")}
          </h4>
        </div>

        <div className="flex flex-row gap-3 items-center">
          <h4>
            Direction:{" "}
            <span className="font-bold">
              {castDetails.directors.map(director => director.name).join(", ")}
            </span>
          </h4>
          <h3>|</h3>
          <h4>
            Producers:{" "}
            <span className="font-bold">
              {castDetails.producers.map(producer => producer.name).join(", ")}
            </span>
          </h4>
        </div>

        <div className="flex flex-row gap-3 items-center">
          <h4>
            Stars:{" "}
            <span className="font-bold">
              {castDetails.actors.map(actor => actor.name).join(", ")}
            </span>
          </h4>
        </div>

        <div className="mt-3">
          <h2 className="font-bold mb-3">Description:</h2>
          <h4 className="text-justify">{description}</h4>
        </div>
      </div>

      <div className="h-8"></div>
    </div>
  );
};

export default MoviePage;