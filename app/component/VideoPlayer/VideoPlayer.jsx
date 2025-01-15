import React, { useRef, useState, useEffect } from "react";
import "shaka-player/dist/controls.css"; // Shaka controls CSS
const shaka = require("shaka-player/dist/shaka-player.ui.js"); // Import Shaka UI separately

const VideoPlayer = ({
  hlsBasePath,
  defaultResolution = "1080p",
  movieTitle,
}) => {
  const videoRef = useRef(null); // Video DOM element reference
  const videoContainerRef = useRef(null); // Video container DOM reference
  const playerRef = useRef(null); // Shaka player instance reference
  const [isClient, setIsClient] = useState(false); // Track if it's client-side
  const [titleVisible, setTitleVisible] = useState(true); // State to track title visibility

  // Initialize the Shaka player on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true); // Set isClient to true on client-side
    }
  }, []);

  useEffect(() => {
    if (isClient && videoRef.current && !playerRef.current) {
      // Initialize the player instance
      const playerInstance = new shaka.Player(videoRef.current);

      // Initialize the UI overlay (controls)
      const ui = new shaka.ui.Overlay(
        playerInstance,
        videoContainerRef.current,
        videoRef.current
      );

      // Configure control panel elements
      const uiConfig = {
        controlPanelElements: [
          "play_pause", // Play/Pause Button
          "mute", // Mute Button
          "volume", // Volume Slider
          "time_and_duration", // Time and Duration
          "seek_bar", // Seek Bar
          "quality", // Quality Selector
          "fullscreen", // Fullscreen Button
        ],
        addBigPlayButton: false, // Optional: Hide the big play button
      };

      ui.configure(uiConfig);

      // Store the player instance
      playerRef.current = playerInstance;

      // Load the video with the default resolution
      loadVideo(playerInstance, defaultResolution);

      // Cleanup on component unmount
      return () => {
        if (playerRef.current) {
          playerRef.current.destroy();
        }
        if (ui) {
          ui.destroy();
        }
      };
    }
  }, [isClient, defaultResolution]);

  // Load the video stream based on the resolution
  const loadVideo = async (playerInstance, resolution) => {
    try {
      const videoUrl = `${hlsBasePath}/master.m3u8`;
      console.log("Loading video with URL:", videoUrl);

      // Load the video stream
      await playerInstance.load(videoUrl);
      console.log(
        `Resolution changed to ${resolution}, video loaded successfully`
      );
    } catch (error) {
      console.error("Error loading new resolution video:", error);
    }
  };

  // Handle video play event
  const handlePlay = () => {
    setTitleVisible(false); // Hide the title when the video starts playing
  };

  return (
    isClient && (
      <div
        className="relative w-full h-screen bg-black"
        ref={videoContainerRef}
      >
        {/* Video element with Shaka's controls */}
        <video
          ref={videoRef}
          className="shaka-player w-full h-full object-contain" // Use object-contain to fit without zooming
          // Shaka will control the video element, so no need for native controls
          onPlay={handlePlay} // Trigger handlePlay when the video starts
        />

        {/* Movie title, hidden when the video starts playing */}
        {movieTitle && titleVisible && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded">
            {movieTitle}
          </div>
        )}
      </div>
    )
  );
};

export default VideoPlayer;
