"use client";
import React from 'react';
import Image from 'next/image';
import GoldenButton from '../component/reuseable/GoldenButton';
import FilmCard from '../component/reuseable/FilmCard';

const Page = () => {
  return (
    <div>
      <div
        className="h-full w-full bg-no-repeat bg-cover bg-center relative">
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-overlay'></div>
        <div className=' absolute  w-[100vw] min-h-[500px] h-full'>
          <Image src={"/dashboard-bg.jpg"} fill objectFit="cover" alt={"dashboard"}></Image>
        </div>
        {/* Pseudo-element Gradient Layer */}
        {/* <style jsx>{`
        .page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
          z-index: 1;
        }
      `}</style> */}

        <div className="page relative z-10">
          <div className="flex justify-between items-center pt-5 pb-4 pl-8 pr-8 bg-transparent z-100">
            <div className="relative w-[180px] h-[70px]">
              <Image src="/logo.png" fill alt="Next.js logo" />
            </div>

            <GoldenButton redirectTo={'/login'} label="Login" />
          </div>
          <div className="border-2 border-[#F2F2F2]  mt-[5%] ml-[10%] mr-[10%] p-5 rounded-[50px] relative z-10  backdrop-blur-md ">
            <h1 className="text-[#F2F2F2]">
              Watch Unlimited
              <br />
              Movies for Only {199}
            </h1>
            <div className="text-center ">
              <h2 className="text-[#F2F2F2] mt-[18%] mb-10" >Create your account to get started</h2>
              <div className="flex justify-center items-center z-50 gap-8 mb-5">
                <input placeholder='Email' type="text" className=" placeholder-[#fff] text-[#fff] pl-8 h-[80px] w-[500px] rounded-[100px] bg-black opacity-50 drop-shadow-2xl shadow-2xl backdrop-blur-3xl" />
                <GoldenButton redirectTo={'/signup'} label="Sign Up" />
              </div>
            </div>

          </div>
          <div className='bg-gray p-20'>
            <h3 className='text-white mt-5'>Trending Shows</h3>
            <div className='flex gap-24 m-8'>
              <FilmCard showContinueWatch={false}
                showStar={false} />
              <FilmCard showContinueWatch={false}
                showStar={false} />
            </div>

          </div>

        </div>

      </div>

    </div>


  );
};

export default Page;
