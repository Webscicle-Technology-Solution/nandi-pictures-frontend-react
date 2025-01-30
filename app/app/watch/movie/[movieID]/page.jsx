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

const Page = async ({ params }) => {
  const { movieID } = await params; // Destructure the movieID from params

  // Dynamically construct the HLS URL based on the movieID
  const hlsUrl = `http://localhost:3001/hls/movies/hls/${movieID}.mp4`;
  return (
    <div>
      <VideoPlayer
        hlsBasePath={hlsUrl}
        defaultResolution="1080p"
        movieTitle={movieID}
      />
    </div>
  );
};

export default Page;
