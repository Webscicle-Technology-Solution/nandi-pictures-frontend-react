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
                <Link
                    href="/app/home"
                    className="button-primary backprim flex flex-row justify-center items-center gap-2 "
                >
                    <IoIosPlayCircle size={40} color="#0C0C0C" />
                    <span className="text-[1.5rem] text-[#0C0C0C]">Watch Now</span>
                </Link>
                <button className="bg-[#0c0c0c] p-3 rounded-xl text-white hover:bg-gray-700 flex flex-row justify-center items-center gap-2 pl-5">
                    <BsBookmarkStarFill size={25} />
                    Add to Favorite
                </button>
            </div>
            <div className='flex flex-row gap-3 mt-5 items-center' >
                <h4>Rating : <span className='text-[#e6ad35] font-bold'>6.5</span> </h4>
                <h3>|</h3>
                <h4 className='font-bold'>R Rated</h4>
                <h3>|</h3>
                <h4>Duration : <span className='text-[#e6ad35] font-bold'>2 hrs 30 min</span> </h4>
                <h3>|</h3>
                <h4 className='font-bold'>Action,Drama</h4>
            </div>
            <div className='flex flex-row gap-3 mt-2 items-center' >
                <h4>Direction : <span className='font-bold'>Anil Kulchainiya</span> </h4>
                <h3>|</h3>
                <h4>Production : <span className='font-bold'>NANDI PICTURES PVT LTD</span> </h4>

            </div>
            <div className='flex flex-row gap-3 mt-2 items-center' >
                <h4>Stars : Vivek Anand Mishra , Yashpal Sharma , Preeti Jhangiani , Lata Sabharwal ,</h4>
            </div>
            <div className='mt-3 '>
                <h2 className='font-bold mb-3'>Description:</h2>
                <h4 className='text-justify'>
                This movie is a biopic on the journey of life of Jain Saint Shri Sudarshan Lal Ji Maharaj who transformed the life of lakhs through his preachings.
                He was born in 1923 in a lower middle-class but a highly cultured and principled family in Rohtak (a sleepy town 40 miles from Delhi). The boy grows up in the midst of chaos in his life due to demise of his mother in early childhood and then his best friend in adolescence within few days after his marriage.
                </h4>
            </div>
            <div className='h-8'></div>
        </div>
    )
}

export default page
