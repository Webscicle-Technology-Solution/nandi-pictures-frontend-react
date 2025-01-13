"use client";
import React from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js

// Dynamically import VideoPlayer with ssr: false to disable SSR for this component
const VideoPlayer = dynamic(
  () => import("@/app/component/VideoPlayer/VideoPlayer"),
  {
    ssr: false, // Disable SSR for this component
  }
);

const Page = ({ params }) => {
  return (
    <div>
      <VideoPlayer
        hlsBasePath="http://localhost:3001/hls/movies/hls/vitamin_d.mp4"
        defaultResolution="1080p"
        movieTitle="Vitamin D - The Documentary"
      />
    </div>
  );
};

export default Page;
