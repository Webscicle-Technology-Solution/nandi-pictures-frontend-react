"use client"
import React from 'react'
import ReactPlayer from 'react-player';
import Link from 'next/link';
import { IoIosPlayCircle } from 'react-icons/io';
import { BsBookmarkStarFill } from 'react-icons/bs';

const page = () => {
    return (
        <div className='ml-10 mr-5'>
            <h1 className='text-[35px] mb-3'>The Rise of Sudarshan Chakra</h1>

            <ReactPlayer
                url='https://www.youtube.com/watch?v=p2zMXSXhZ9M'
                playing={false} // Auto-play the trailer
                controls={false} // Show player controls
                width="100%"
                height="550px"
                className="rounded-2xl justify-center" // Add rounded corners here
            />

            <div className='flex flex-row mt-5 gap-5'>
                <button className="bg-[#0c0c0c] p-3 rounded-xl text-white hover:bg-gray-700 flex flex-row justify-center items-center gap-2 pl-5">
                    <BsBookmarkStarFill size={25} />
                    Add to Favorite
                </button>
            </div>
            <div className='flex flex-row gap-3 mt-2 items-center' >
                <h4>Singer : <span className='font-bold'>Anil Kulchainiya</span> </h4>
                <h3>|</h3>
                <h4>Production : <span className='font-bold'>NANDI PICTURES PVT LTD</span> </h4>

            </div>
            <div className='h-8'></div>
        </div>
    )
}

export default page
