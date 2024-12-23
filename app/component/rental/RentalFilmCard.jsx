"use client";
// components/RentalFimCard.js
import React from "react";
import { IoIosPlayCircle } from "react-icons/io";

const RentalFimCard = ({ title, expiringTime, bio, duration, image }) => {
  return (
    <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:transform hover:scale-105 cursor-pointer">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-[180px] object-cover" onClick={() => {
          // Handle image click
          
        }} />
        <div className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
          Expires in {expiringTime}
        </div>
        <div className=" flex flex-row gap-2 absolute bottom-4 left-4 bg-yellow-400 text-black font-semibold px-3 py-1 rounded hover:bg-yellow-500">
        <IoIosPlayCircle size={30} color="#0C0C0C" />
        <button>
          
          Watch Now
        </button>
        </div>
       
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{bio}</p>
        <p className="text-gray-500 text-sm mt-4">Duration: {duration}</p>
      </div>
    </div>
  );
};

export default RentalFimCard;
