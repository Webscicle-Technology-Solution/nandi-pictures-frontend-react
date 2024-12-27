"use client";
import FilmCard from '@/app/component/reuseable/FilmCard'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col justify-start items-start w-full'>
      <h1>Favourite</h1>
      <div className='w-full flex'>
      <FilmCard showStar={true} showContinueWatch={false} imageSrc='/poster.jpg' title='THE RISE OF SUDARSHAN CHAKRA' isFavorite={true} />
      <FilmCard showStar={true} showContinueWatch={false} imageSrc='/poster.jpg' title='THE RISE OF SUDARSHAN CHAKRA' isFavorite={true} />
      
      </div>

    </div>
  )
}

export default page