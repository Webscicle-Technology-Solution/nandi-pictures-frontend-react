"use client";
import React from "react";
import { useState, useEffect } from "react";
import { use } from "react";
import VideoPlayer from "@/app/component/VideoPlayer/VideoPlayer";

const page = ({ params }) => {
  return (
    <>
      <div>
        <VideoPlayer hlsPath="http://localhost:3001/hls/movies/hls/vitamin_d.mp4/1080p/output.m3u8" />
      </div>
    </>
  );
};

export default page;
