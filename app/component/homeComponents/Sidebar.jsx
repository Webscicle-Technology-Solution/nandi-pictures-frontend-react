"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoHome } from "react-icons/io5";

import { BsBookmarkStarFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { MdSubscriptions } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/app/(auth)/authStore";


const Sidebar = () => {

  // STATES
  const [userSubscription, setUserSubscription] = useState(null);
  const [loading, setLoading] = useState(true);  // State to track loading status

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const checkAuth = useAuthStore((state) => state.checkAuth);


 const router = useRouter()
  const pathname = usePathname();

  let conditionResult = "";

  if (pathname.includes("/app/")) {
    const extractedWord = pathname.split("/app/")[1];
    conditionResult = extractedWord.split("/")[0];
  }

  const handleSubscriptionButtonClick = () => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      router.push("/login");
    } else {
      // Redirect to subscription plan page if authenticated
      router.push("/app/plan");
    }
  };

  useEffect(() => {
    const fetchuser = async () => {
      if (!isAuthenticated) {
        console.log("No access token available");
        setLoading(false);  // Set loading to false if not authenticated
        return;
      }

      try {
       const response = await checkAuth();

        if (!response) {
          console.error("Error: User data not found.");
        }else{
          setUserSubscription(response.user.subscriptionId.subscriptionTypeId.name)
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }

    }
    fetchuser();
  },[isAuthenticated,checkAuth])
  
console.log("userSubscription:",isAuthenticated)
  return (
    <div className="fixed top-0 left-0 h-full flex flex-col justify-start items-center pt-10">
      <div className="relative w-[70px] h-[84px] mb-8">
        <Image src="/logo-only.png" fill alt="Logo" />
      </div>

      <div className="flex flex-col gap-8 mt-1">
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
        {/* Subscription Button (Change based on subscription status) */}
        <button
  onClick={handleSubscriptionButtonClick}
  className={`${
    loading 
      ? "bg-gray-300 text-transparent cursor-not-allowed animate-pulse" // Loading styles
      : "backprim" // Normal button styles
  } rounded-full ml-3 pl-12 pr-12 py-3 flex items-center gap-3 text-[15px] font-semiold`}
>
  <MdSubscriptions />
  {loading ? (
    <div className="animate-pulse w-16 h-4 bg-gray-300 rounded-md" /> // Loading skeleton
  ) : isAuthenticated ? (
    userSubscription === "free" ? (
      "Subscribe"
    ) : userSubscription === "silver" ? (
      <span>Upgrade to Gold</span>
    ) : userSubscription === "gold" ? (
      <span>Gold Plan</span>
    ) : (
      "Subscribe"
    )
  ) : (
    "Login"
  )}
</button>

      </div>
    </div>
  );
};

export default Sidebar;
