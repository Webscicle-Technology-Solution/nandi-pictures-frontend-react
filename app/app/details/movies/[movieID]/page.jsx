"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoIosPlayCircle } from 'react-icons/io';
import { BsBookmarkStarFill } from 'react-icons/bs';
import { usePathname,useRouter  } from "next/navigation";
import useAuthStore from "@/app/(auth)/authStore";
import Image from 'next/image';
import getMovieAction from '@/app/utils/getMovieAction';

const MoviePage = () => {
  const pathname = usePathname();
  const movieID = pathname.split("/").pop(); // Extract movie ID from URL

  const [movie, setMovie] = useState(null); // Use single movie object instead of array
  const accessToken = useAuthStore((state) => state.accessToken);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const subscriptionPlan = useAuthStore((state) => state.subscriptionPlan); // Get subscription plan from store
  const [buttonText, setButtonText] = useState("Watch Now");  // Default button text
  const router = useRouter();  // Import useRouter to handle redirection



  useEffect(() => {
    
    const fetchMovieDetails = async () => {
      if (!accessToken) {
        console.log("No access token available");
        return;
      }

      try {
        console.log("Using access token:", accessToken); // Debug log

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

        const data = await response.json();

        if (data.message === "Movie found successfully") {
          setMovie(data.moviedetails); // Update state with the movie details
          console.log(data.moviedetails);
        } else {
          console.error("Error: Movie data not found.");
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [accessToken, apiBaseUrl, movieID]);

    // Handle the "Watch Now" button click
    const handleWatchNow = () => {
      const action = getMovieAction(movie, subscriptionPlan);  // Determine the action based on movie and subscription
  
      if (action === 'login') {
        alert('You need to log in to watch this movie!');
        router.push('/login');  // Redirect to the login page
      } else if (action === 'subscribe') {
        alert('You need a subscription to watch this movie!');
        router.push('/subscribe');  // Redirect to the subscription page
      } else if (action === 'rent') {
        alert('You can rent this movie!');
        router.push(`/rent/${movie._id}`);  // Redirect to the rent page
      } else if (action === 'watchNow') {
        router.push(`/watch/movie/${movie._id}`);  // Redirect to the watch page
      }
    };


  //button label function
  const setButtonLabel = () => {
    const action = getMovieAction(movie, subscriptionPlan);
  
    if (action === 'login') {
      setButtonText("Login to Watch");
    } else if (action === 'subscribe') {
      setButtonText("Subscribe to Watch");
    } else if (action === 'rent') {
      setButtonText("Rent Now");
    } else if (action === 'watchNow') {
      setButtonText("Watch Now");
    }
  };
  useEffect(() => {
    if (movie) {
      setButtonLabel();  // Update the button text
    }
  }, [movie, subscriptionPlan]);

  

  // If the movie data is still loading, show a loading state
  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ml-10 mr-5">
      <h1 className="text-[35px] mb-3">{movie.title}</h1>

      {/* Display movie banner or default image */}
      <div className="relative w-[55vw] h-[350px]">
        <Image
          src={"/banner-placeholder.png"} // Use API banner image if available
          alt="Movie Banner"
          fill
          objectFit="contain"
          className="rounded-2xl justify-center"
        />
      </div>
      
      <div className='flex flex-row mt-5 gap-5'>
        <button
          onClick={handleWatchNow}
          // href="/app/home"
          className="button-primary backprim flex flex-row justify-center items-center gap-2 "
        >
          <IoIosPlayCircle size={40} color="#0C0C0C" />
          <span className="text-[1.5rem] text-[#0C0C0C]" 
          // onClick={() => { 
          //   window.location.href = "/app/watch/movie/" + movie._id;
          // }}
          >{buttonText}</span>
        </button>
        <button className="bg-[#0c0c0c] p-3 rounded-xl text-white hover:bg-gray-700 flex flex-row justify-center items-center gap-2 pl-5">
          <BsBookmarkStarFill size={25} />
          Add to Favorite
        </button>
      </div>

      {/* Movie Info Section */}
      <div className="!text-[1.2rem]">
        <div className="flex flex-row gap-3 mt-5 items-center">
          <h4 className="text-[1rem]">
            Rating: <span className="text-[#e6ad35] font-bold">6.5</span>
          </h4>
          <h3>|</h3>
          <h4 className="font-bold">{movie.certificate}</h4>
          <h3>|</h3>
          <h4>
            Duration:{" "}
            <span className="text-[#e6ad35] font-bold">
              {movie.durationHours} hrs {movie.durationMinutes} min
            </span>
          </h4>
          <h3>|</h3>
          <h4 className="font-bold">
            {movie.genres.map((genre) => genre.name).join(", ")}
          </h4>
        </div>

        {/* Director and Production Info */}
        <div className="flex flex-row gap-3  items-center">
          <h4>
            Direction:{" "}
            <span className="font-bold">
              {movie.castDetails.directors
                .map((director) => director.name)
                .join(", ")}
            </span>
          </h4>
          <h3>|</h3>
          <h4>
            Producers:{" "}
            <span className="font-bold">
              {movie.castDetails.producers
                .map((producer) => producer.name)
                .join(", ")}
            </span>
          </h4>
        </div>

        {/* Actors Section */}
        <div className="flex flex-row gap-3 items-center">
          <h4>
            Stars:{" "}
            <span className="font-bold">
              {movie.castDetails.actors.map((actor) => actor.name).join(", ")}
            </span>
          </h4>
        </div>

        {/* Description Section */}
        <div className="mt-3">
          <h2 className="font-bold mb-3">Description:</h2>
          <h4 className="text-justify">{movie.description}</h4>
        </div>
      </div>

      <div className="h-8"></div>
    </div>
  );
};

export default MoviePage;
