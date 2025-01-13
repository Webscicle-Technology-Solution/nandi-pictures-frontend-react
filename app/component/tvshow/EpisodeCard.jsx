import React from 'react'
import Image from "next/image";

const EpisodeCard = ({episode }) => {
    const { title, season, episodeNumber, description, time, thumbnailUrl } = episode;

    return (
        <div className="flex w-full mt-5 rounded-lg border border-gray-200 bg-white shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-105 hover:shadow-xl hover:bg-gray-50 cursor-pointer">
          <div className="relative w-[250px] h-[180px]">
            <img 
              src='https://marketplace.canva.com/EAFTl0ixW_k/1/0/1131w/canva-black-white-minimal-alone-movie-poster-YZ-0GJ13Nc8.jpg' 
              alt={`Thumbnail of ${title}`} 
              layout="cover" 
              objectFit="fill" 
              className="rounded-l-lg"
            />
          </div>
          <div className="p-4 flex-1">
            <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
            <p className="text-lg text-gray-600 mt-2 items-center">S{season} | E{episodeNumber} | {time}</p>
            <p className="text-md text-gray-600 mt-2">{description}</p>
          </div>
        </div>
      );    
}

export default EpisodeCard