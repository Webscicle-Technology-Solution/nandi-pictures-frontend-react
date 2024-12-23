"use client";
import React, { useState } from 'react'
import { HiArrowSmallRight } from "react-icons/hi2";
import { BiSolidError } from "react-icons/bi";
import Link from 'next/link';
import Image from 'next/image';

const ProfileSection = () => {
    const [selectedSection, setSelectedSection] = useState("1");
    const [quality, setQuality] = useState("medium");
    const [theme, setTheme] = useState("system");

    const handleSectionChange = (section) => {
        setSelectedSection(section);
    }

    const handleQualityChange = (quality) => {
        setQuality(quality);
    }

    const handleThemeChange = (theme) => {
        setTheme(theme);
    }

    return (
        <div className='w-full flex flex-row px-10 gap-10'>
            <div className="h-[500px] flex flex-col justify-between items-start pt-10 w-1/2">
                {/* Account Settings Section */}

                <div
                    onClick={() => handleSectionChange("1")}
                    className={`flex flex-row justify-between w-full items-center h-[90px] p-8 rounded-2xl cursor-pointer hover:bg-white
                    ${selectedSection === "1" ? "bg-white border-[2px] border-[#e6ad35]" : "bg-transparent border-none"}`}
                >
                    <h4>Account Settings</h4>
                    <HiArrowSmallRight size={35} />
                </div>
                {/* Stream Quality Section */}
                <div
                    onClick={() => handleSectionChange("2")}
                    className={`flex flex-row justify-between w-full items-center h-[90px] p-8 rounded-2xl cursor-pointer hover:bg-white
                    ${selectedSection === "2" ? "bg-white border-[2px] border-[#e6ad35]" : "bg-transparent border-none"}`}
                >
                    <h4>Stream Quality</h4>
                    <HiArrowSmallRight size={35} />
                </div>

                {/* Theme Section */}
                <div
                    onClick={() => handleSectionChange("3")}
                    className={`flex flex-row justify-between w-full items-center h-[90px] p-8 rounded-2xl cursor-pointer hover:bg-white
                    ${selectedSection === "3" ? "bg-white border-[2px] border-[#e6ad35]" : "bg-transparent border-none"}`}
                >
                    <h4>Theme</h4>
                    <HiArrowSmallRight size={35} />
                </div>

                {/* Help & Support Section */}
                <div
                    onClick={() => handleSectionChange("4")}
                    className={`flex flex-row justify-between w-full items-center h-[90px] p-8 rounded-2xl cursor-pointer hover:bg-white
                    ${selectedSection === "4" ? "bg-white border-[2px] border-[#e6ad35]" : "bg-transparent border-none"}`}
                >
                    <h4>Help & Support</h4>
                    <HiArrowSmallRight size={35} />
                </div>
            </div>
            <div className='min-w-[2px] ml-10 bg-black'>

            </div>
            <div className={`${selectedSection === "1" ? "block" : "hidden"} w-2/3 flex flex-col justify-start items-center mr-5 mt-12`}>
                <div className="flex flex-col items-center">
                    <div className="relative w-40 h-36 rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src="/poster.jpg" // Replace with the correct image path
                            alt="Scene"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
                <div className="text-center space-y-4 mt-4 mb-4">
                    <h2 className="text-xl">John Doe</h2>
                    <div className='w-full flex flex-col justify-start items-start gap-4'>

                        <p className="text-xl text-gray-600 ml-[-40px] ">Registered E-mail address</p>
                        <h1 className='text-2xl mt-[-10px] ml-[40px]'>demo****@gmail.com</h1>
                        <p className="text-xl text-gray-600 ml-[-40px] ">Phone Number</p>
                        <h1 className='text-2xl mt-[-10px] ml-[40px]'>+91 92*****710</h1>
                        <p className="text-xl text-gray-600 ml-[-40px]">Subscription Plan</p>
                        <div className='w-full flex flex-row justify-between items-center'>
                            <h1 className='text-2xl '>No Active Plan</h1>

                            {/* Button Section */}
                            <Link href="/add-plan">
                                <div className="text-yellow-500 font-bold text-xl hover:text-yellow-600">
                                    Add a plan
                                </div>
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Quality Section */}

            </div>
            <div className={`${selectedSection === "2" ? "block" : "hidden"} w-2/3 flex flex-col justify-start items-start mt-12 mr-5 gap-16`}>
                <div className='w-full flex flex-row justify-between items-center'>
                    <div className='flex flex-col justify-between items-start gap-1'>
                        <h1 className='text-2xl mt-[-15px]'>Data Saver</h1>
                        <p className="text-xl text-gray-600 ">Video playback will be in Low quality<br /> (360p & lower)</p>
                    </div>
                    <div className='size-[40px] flex items-center justify-center text-center rounded-full overflow-hidden bg-gray-300'>
                        <button onClick={() => handleQualityChange("low")} className={`${quality === "low" ? "bg-[#e6ad35] p-2" : "bg-gray-300"} w-[30px] h-[30px] rounded-full`}></button>
                    </div>
                </div>
                <div className='w-full flex flex-row justify-between items-center'>
                    <div className='flex flex-col justify-between items-start gap-1'>
                        <h1 className='text-2xl mt-[-15px]'>Meduim Quality</h1>
                        <p className="text-xl text-gray-600 ">Video playback will be in Medium quality <br />(480p)</p>
                    </div>
                    {/* <input type="radio" id="html" name="fav_language" value="HTML" className='bg-gray-300 size-10' /> */}
                    <div className='size-[40px] flex items-center justify-center text-center rounded-full overflow-hidden bg-gray-300'>
                        <button onClick={() => handleQualityChange("medium")} className={`${quality === "medium" ? "bg-[#e6ad35] p-2" : "bg-gray-300"} w-[30px] h-[30px] rounded-full`}></button>
                    </div>
                </div>
                <div className='w-full flex flex-row justify-between items-center'>
                    <div className='flex flex-col justify-between items-start gap-1'>
                        <h1 className='text-2xl mt-[-15px]'>High Quality</h1>
                        <p className="text-xl text-gray-600 ">Video playback will be in High quality <br />(720p & Higher)</p>
                    </div>
                    {/* <button className='w-[35px] h-[35px] rounded-full bg-gray-300'></button> */}
                    <div className='size-[40px] flex items-center justify-center text-center rounded-full overflow-hidden bg-gray-300'>
                        <button onClick={() => handleQualityChange("high")} className={`${quality === "high" ? "bg-[#e6ad35] p-2" : "bg-gray-300"} w-[30px] h-[30px] rounded-full`}></button>
                    </div>
                </div>
            </div>

            {/* Theme Section */}

            <div className={`${selectedSection === "3" ? "block" : "hidden"} w-2/3 flex flex-col justify-start items-start mt-12 mr-5 gap-16`}>
                <div className='w-full flex flex-row justify-between items-center'>
                    <div className='flex flex-col justify-between items-start gap-1'>
                        <h1 className='text-2xl font-normal  mt-[-15px]'>System Theme</h1>
                        {/* <p className="text-xl text-gray-600 ">Video playback will be in Low quality<br /> (360p & lower)</p> */}
                    </div>
                    <div className='size-[40px] flex items-center justify-center text-center rounded-full overflow-hidden bg-gray-300'>
                        <button onClick={() => handleThemeChange("system")} className={`${theme === "system" ? "bg-[#e6ad35] p-2" : "bg-gray-300"} w-[30px] h-[30px] rounded-full`}></button>
                    </div>
                </div>
                <div className='w-full flex flex-row justify-between items-center'>
                    <div className='flex flex-col justify-between items-start gap-1'>
                        <h1 className='text-2xl font-normal  mt-[-15px]'>Light Theme</h1>
                        {/* <p className="text-xl text-gray-600 ">Video playback will be in Medium quality <br />(480p)</p> */}
                    </div>
                    {/* <input type="radio" id="html" name="fav_language" value="HTML" className='bg-gray-300 size-10' /> */}
                    <div className='size-[40px] flex items-center justify-center text-center rounded-full overflow-hidden bg-gray-300'>
                        <button onClick={() => handleThemeChange("light")} className={`${theme === "light" ? "bg-[#e6ad35] p-2" : "bg-gray-300"} w-[30px] h-[30px] rounded-full`}></button>
                    </div>
                </div>
                <div className='w-full flex flex-row justify-between items-center'>
                    <div className='flex flex-col justify-between items-start gap-1'>
                        <h1 className='text-2xl font-normal mt-[-15px]'>Dark Theme</h1>
                        {/* <p className="text-xl text-gray-600 ">Video playback will be in High quality <br />(720p & Higher)</p> */}
                    </div>
                    {/* <button className='w-[35px] h-[35px] rounded-full bg-gray-300'></button> */}
                    <div className='size-[40px] flex items-center justify-center text-center rounded-full overflow-hidden bg-gray-300'>
                        <button onClick={() => handleThemeChange("dark")} className={`${theme === "dark" ? "bg-[#e6ad35] p-2" : "bg-gray-300"} w-[30px] h-[30px] rounded-full`}></button>
                    </div>
                </div>
            </div>
            {/* Help & Support Section */}

            <div className={`${selectedSection === "4" ? "block" : "hidden"} w-2/3 flex flex-col justify-start items-start mt-12 mr-5 gap-5`}>
                <div className='flex flex-row justify-between items-center gap-3'>
                    <h2>Report an issue</h2>
                    <BiSolidError color='red' size={30} />

                </div>
                <form className='w-full' action={''} method='post' >

                <textarea
                    placeholder="Enter your issue" required
                    className='p-4 w-full h-[200px] rounded-[10px] border-[2px] resize-none overflow-auto'
                />
                <div className='flex w-full justify-end pr-5'>
                <button className='bg-[#e6ad35] p-3 rounded-2xl w-[100px] text-white hover:scale-110'>Send</button>

                </div>
                </form>

                <div className='flex flex-row justify-center items-center gap-3 w-full'>

                <button className='bg-[#0c0c0c] mt-4 mb-4 p-4 rounded-2xl hover:bg-[#e6ad35] hover:text-[#0c0c0c] text-[#e6ad35] items-center justify-center'>
                    <h4 className='font-medium '>Contact Us</h4>
                </button>
                </div>
            </div>

        </div>



    );
};

export default ProfileSection;
