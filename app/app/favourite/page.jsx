"use client";
import React from 'react'
import FilmCardCarousel from "@/app/component/reuseable/FilmCardCarousel";

const page = () => {
  return (
    <div className='flex flex-col justify-start items-start w-full'>
      <h1>Favourite</h1>
      <div className='w-full flex'>
      <FilmCardCarousel />
      
      
      </div>

    </div>
  )
}

export default page 