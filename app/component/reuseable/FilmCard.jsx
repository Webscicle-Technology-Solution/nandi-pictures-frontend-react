// components/FilmCard.js
import React from 'react';
import Image from 'next/image';

const FilmCard = ({
  imageSrc = '/poster.jpg', // Default placeholder image
  title = 'CRONOS NEW DAWN', // Default title
  showContinueWatch = true, // Show or hide Continue Watch
  showStar = true, // Show or hide Star button
}) => {
  return (
    <div className="relative w-72 h-[400px] bg-gray-900 rounded-lg overflow-hidden shadow-lg text-white">
      {/* Background Image */}
      <Image
        src={imageSrc}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="opacity-90"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

      {/* Film Title */}
      <div className="absolute top-6 left-4 text-lg font-bold">{title}</div>

      {/* Star Button (Favorite) */}
      {showStar && (
        <div className="absolute top-4 right-4">
          <button className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full">
            ⭐
          </button>
        </div>
      )}

      {/* Continue Watch */}
      {showContinueWatch && (
        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <button className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full">
            ▶
          </button>
          <span className="text-sm font-semibold">Continue Watch</span>
        </div>
      )}
    </div>
  );
};

export default FilmCard;
