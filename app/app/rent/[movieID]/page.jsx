
"use client"
import React from 'react'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import useAuthStore from '@/app/(auth)/authStore';
const RentPage = () => {
  const pathname = usePathname();
  const movieID = pathname.split("/").pop(); // Extract movie ID from URL

  const [movie, setMovie] = useState(null); // Use single movie object instead of array

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const accessToken = useAuthStore((state) => state.accessToken);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {

    const fetchMovieDetails = async () => {
      console.log("isAuthenticated", isAuthenticated)
      if (!isAuthenticated) {
        console.log("No access token available");
        return;
      }

      try {
        // console.log("Using access token:"); // Debug log

        const response = await fetch(
          `${apiBaseUrl}/purchase/rentals/details/${movieID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // token: accessToken,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.movieDetails.accessParams.accessType === "rentable") {
          setMovie(data.movieDetails); // Update state with the movie details
        } else {
          console.error("Error: Movie data not found.");
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();

  }, [apiBaseUrl,accessToken, movieID, isAuthenticated]);

  const rentMovie = async () => {
    if (!isAuthenticated) {
      console.log("No access token available");
      return;
    }

    try {
      const response = await fetch(
        `${apiBaseUrl}/purchase/rentmovie/${movieID}`,  
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: accessToken,
          }
          
        }
      );
      // alert(response.data.message)
//       console.log("Response Status:", response.status);
// console.log("Response Text:", await response.text());
      if (!response.ok) {
        if(response.status === 400){
          alert('You already rented this movie')
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // setMovie(data.movieDetails); // Update state with the movie details
        alert(data.message);
      } else {
        alert(data.message);
        console.error("Error: Movie data not found.");
      }
    } catch (error) {
      // alert("Error Renting movie:", error);
      console.error("Error Renting movie:", error);
    }
  }

  console.log("movie",accessToken)

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center space-x-8">
        {/* Movie Banner */}
        <div className="w-1/3 h-72">
          <img
            src={'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRRyuWmayVBvqjd1MxTKpRgauq2cCtUzb7Q9QvaFTkAuxAU_EYMoCE3wBuJeftxIzf0grreIw' }
            alt={movie.title}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Movie Details */}
        <div className="flex-1 space-y-4">
          {/* Title with Highlight */}
          <h1 className="text-3xl font-bold text-black">{movie.title}</h1>

          {/* Duration and Stars */}
          <p className="text-base text-gray-600 flex flex-row">
            <strong>Duration:&nbsp; </strong> {movie.durationHours}h {movie.durationMinutes}m
          </p>
          <p className="text-base text-gray-600">
            <strong>Stars:</strong> {movie.castDetails.actors.map(actor => actor.name).join(', ')}
          </p>

          {/* Director and Producer */}
          <p className="text-base text-gray-600">
            <strong>Director:</strong> {movie.castDetails.directors.map(director => director.name).join(', ')}
          </p>
          <p className="text-base text-gray-600">
            <strong>Producer:</strong> {movie.castDetails.producers.map(producer => producer.name).join(', ')}
          </p>

          {/* Description */}
          <p className="text-base text-gray-600">
            <strong>Description:</strong> {movie.description}
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 text-sm text-gray-500 italic">
        <p><strong>Disclaimer:</strong> This movie rental will be available for 24 hours and can only be watched once.</p>
      </div>

      {/* Rent Now Button with Rental Price */}
      <div className="mt-8 flex items-center justify-center space-x-4">
        <button className="button-primary backprim flex flex-row justify-center items-center gap-2" onClick={rentMovie}>
          <span className='text-black font-normal text-xl'>
            Rent For
          </span>
          <span className=" font-semibold text-black text-xl">{movie.accessParams.rentalPrice}</span>

        </button>

      </div>
    </div>
  );
};

export default RentPage