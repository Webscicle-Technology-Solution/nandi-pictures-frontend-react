"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { RiMovie2Fill } from "react-icons/ri";
import { TbDeviceTvOldFilled } from "react-icons/tb";
import { BiSolidCameraMovie } from "react-icons/bi";
import { IoIosFilm } from "react-icons/io";
import { SiApplemusic } from "react-icons/si";
import { BsBookmarkStarFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  let conditionResult = "";

  if (pathname.includes("/app/")) {
    const extractedWord = pathname.split("/app/")[1];
    conditionResult = extractedWord.split("/")[0];
  }

  return (
    <div className="fixed top-0 left-0 h-full flex flex-col justify-start items-center pt-10">
      <div className="relative w-[70px] h-[84px] mb-8">
        <Image src="/logo-only.png" fill alt="Logo" />
      </div>

      <div className="flex flex-col gap-3 mt-1">
        <Link
          href="/app/home"
          className={`${
            pathname.includes("home") ?"backprim" : ""
          }   rounded-r-full pl-10 pr-6 py-2 flex items-center gap-3`}
        >
          <IoHome size={22} />
          <h4>Home</h4>
        </Link>

        <Link
          href="/app/movies"
          className={`${
            pathname.includes("movies") ? "backprim" : ""
          } rounded-r-full pl-10 pr-6 py-2 flex items-center gap-3`}
        >
          <RiMovie2Fill size={22} />
          <h4>Movies</h4>
        </Link>

        <Link
          href="/app/tvshows"
          className={`${
            pathname.includes("tvshows") ? "backprim" : ""
          } rounded-r-full pl-10 pr-6 py-2 flex items-center gap-3`}
        >
          <TbDeviceTvOldFilled size={22} />
          <h4>TV Series</h4>
        </Link>

        <Link
          href="/app/shortfilm"
          className={`${
            pathname.includes("shortfilm") ? "backprim" : ""
          } rounded-r-full pl-10 pr-6 py-2 flex items-center gap-3`}
        >
          <IoIosFilm size={22} />
          <h4>Short Film</h4>
        </Link>

        <Link
          href="/app/documentary"
          className={`${
            pathname.includes("documentary") ? "backprim" : ""
          } rounded-r-full pl-10 pr-6 py-2 flex items-center gap-3`}
        >
          <BiSolidCameraMovie size={22} />
          <h4>Documentary</h4>
        </Link>

        <Link
          href="/app/music"
          className={`${
            pathname.includes("music") ? "backprim" : ""
          } rounded-r-full pl-10 pr-6 py-2 flex items-center gap-3`}
        >
          <SiApplemusic size={22} />
          <h4>Music</h4>
        </Link>

        <Link
          href="/app/rental"
          className={`${
            pathname.includes("rental") ? "backprim" : ""
          } rounded-r-full pl-10 pr-6 py-2 flex items-center gap-3`}
        >
          <div className="relative w-[22px] h-[22px]">
            <Image src="/rent.png" fill alt="Rental" />
          </div>
          <h4>My Rentals</h4>
        </Link>

        <Link
          href="/app/favourite"
          className={`${
            pathname.includes("favourite") ? "backprim" : ""
          } rounded-r-full pl-10 pr-6 py-2 flex items-center gap-3`}
        >
          <BsBookmarkStarFill size={22} />
          <h4>Favourite</h4>
        </Link>

        <Link
          href="/app/settings"
          className={`${
            pathname.includes("settings") ? "backprim" : ""
          } rounded-r-full pl-10 pr-6 py-2 flex items-center gap-3`}
        >
          <IoSettings size={22} />
          <h4>Settings</h4>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
