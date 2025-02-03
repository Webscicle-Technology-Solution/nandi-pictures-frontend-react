"use client"
import React from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useAuthStore from '@/app/(auth)/authStore';

const RentPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const movieID = pathname.split("/").pop();
  const [movie, setMovie] = useState(null);
  const [isRenting, setIsRenting] = useState(false);
  const [rentSuccess, setRentSuccess] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const accessToken = useAuthStore((state) => state.accessToken);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!isAuthenticated) {
        console.log("No access token available");
        return;
      }

      try {
        const response = await fetch(
          `${apiBaseUrl}/purchase/rentals/details/${movieID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.movieDetails.accessParams.accessType === "rentable") {
          setMovie(data.movieDetails);
        } else {
          console.error("Error: Movie data not found.");
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [apiBaseUrl, accessToken, movieID, isAuthenticated]);

  const rentMovie = async () => {
    if (!isAuthenticated) {
      console.log("No access token available");
      return;
    }

    setIsRenting(true);

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

      if (!response.ok) {
        if(response.status === 400) {
          alert('You already rented this movie');
          throw new Error('You already rented this movie');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setRentSuccess(true);
        // Wait 1.5 seconds before redirecting
        setTimeout(() => {
          router.push(`app/watch/movie/${movieID}`);
        }, 1500);
      } else {
        throw new Error(data.message || 'Failed to rent movie');
      }
    } catch (error) {
      console.error("Error Renting movie:", error);
    } finally {
      setIsRenting(false);
    }
  }

  if (!movie) {
    return <div className="flex justify-center items-center min-h-screen">
      <div>Loading...</div>
    </div>;
  }

  return (
    <div className="p-6">
      {rentSuccess && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md">
          Movie rented successfully! Redirecting to watch page...
        </div>
      )}

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
          <h1 className="text-3xl font-bold text-black">{movie.title}</h1>
          <p className="text-base text-gray-600 flex flex-row">
            <strong>Duration:&nbsp; </strong> {movie.durationHours}h {movie.durationMinutes}m
          </p>
          <p className="text-base text-gray-600">
            <strong>Stars:</strong> {movie.castDetails.actors.map(actor => actor.name).join(', ')}
          </p>
          <p className="text-base text-gray-600">
            <strong>Director:</strong> {movie.castDetails.directors.map(director => director.name).join(', ')}
          </p>
          <p className="text-base text-gray-600">
            <strong>Producer:</strong> {movie.castDetails.producers.map(producer => producer.name).join(', ')}
          </p>
          <p className="text-base text-gray-600">
            <strong>Description:</strong> {movie.description}
          </p>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-500 italic">
        <p><strong>Disclaimer:</strong> This movie rental will be available for 24 hours and can only be watched once.</p>
      </div>

      <div className="mt-8 flex items-center justify-center space-x-4">
        <button 
          className="button-primary backprim flex flex-row justify-center items-center gap-2" 
          onClick={rentMovie}
          disabled={isRenting || rentSuccess}
        >
          <span className='text-black font-normal text-xl'>
            {isRenting ? 'Processing...' : 'Rent For'}
          </span>
          {!isRenting && (
            <span className="font-semibold text-black text-xl">
              {movie.accessParams.rentalPrice}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default RentPage