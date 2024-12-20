import React, { useState } from 'react';
import Image from 'next/image';
import { FaStar } from "react-icons/fa";
import { IoIosPlayCircle } from "react-icons/io";
import Link from 'next/link';

const FilmCard = ({
  imageSrc = '/poster.jpg', // Default placeholder image
  title = 'THE RISE OF SUDARSHANckasfklajfkjasklfjkdlaasfa;fl;af;askf;lkasf;kas;lfkas;', // Default title
  showContinueWatch = true, // Show or hide Continue Watch
  filmDetailUrl = '/login', // Default film detail URL
}) => {
  // State to manage if the film is in the favorites
  const [isFav, setIsFav] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFavClick = () => {
    setIsFav(!isFav); // Toggle the favorite status
  };

  return (
    <>
      <div
        className=" h-[400px] bg-gray-900 rounded-lg overflow-hidden shadow-lg text-white cursor-pointer transition-transform transform 
        hover:scale-110 hover:shadow-xl hover:z-20        "
      >
        {/* Background Image */}
        <Image
          src={imageSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="opacity-90"
        />

        {/* Gradient Overlay */}
        <Link href={filmDetailUrl}><div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div></Link>


        {/* Film Title */}
        <div className="absolute top-6 left-4 text-[15px] font-semibold pr-10 overflow-clip">{title}</div>

        {/* Star Button (Favorite) */}
        <div
          className="absolute top-5  items-end justify-end w-full flex flex-col pr-3"
        // Toggle favorite on click
        >
          <div
            onMouseEnter={() => setIsHovered(true)} // Show text on hover
            onMouseLeave={() => setIsHovered(false)} // Hide text on mouse leave
            onClick={handleFavClick}
          >
            {isFav ? (
              <FaStar color='#FFBF00' size={35} />
            ) : (
              <FaStar color='#f2f2f2' size={35} />
            )}
          </div>

          {/* Display "Add to Favorites" text on hover */}
          {isHovered && !isFav && (
            <span className=" absolute top-10 mr-2 mt-1 text-sm text-white font-medium bg-black/90 p-2 text-[0.6rem] pr-3 rounded-lg ">
              Add to Favorites
            </span>

          )}

          {/* Display "Added to Favorites" text after click */}
          {isFav &&isHovered && (
            <span className=" absolute top-10 mr-2 mt-1 text-sm text-white font-medium bg-black/90 p-2 text-[0.6rem] pr-3 rounded-lg ">
              Added to Favorites
            </span>
          )}
        </div>

        {/* Continue Watch */}
        {showContinueWatch && (
          <div className="absolute pt-2 bottom-4 ml-2 pl-3 pr-3 pb-2 flex items-center space-x-2 hover:bg-white/40 rounded-xl">
            <IoIosPlayCircle size={40} color='#FFBF00' />
            <span className="text-lg font-light">Continue Watch</span>
          </div>
        )}
      </div>
    </>
  );
};

export default FilmCard;
