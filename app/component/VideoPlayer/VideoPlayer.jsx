"use client";
import React, { useEffect, useRef, useState } from "react";
import shaka from "shaka-player";

const VideoPlayer = ({ hlsPath }) => {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const player = new shaka.Player(videoRef.current);

    player.configure({
      streaming: {
        retryParameters: {
          maxAttempts: 3,
          baseDelay: 1000, // 1 second
        },
      },
    });

    player.addEventListener("error", (event) => {
      setError(event.detail);
    });

    player
      .load(createHlsUrl(hlsPath))
      .then(() => {
        // Optional: Play automatically
        // player.play();
      })
      .catch((error) => {
        setError(error);
      });

    setPlayer(player);

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [hlsPath]);

  const createHlsUrl = (hlsPath) => {
    // Assuming your server is running on http://localhost:3000
    return `${hlsPath}`;
  };

  return (
    <div>
      {error && <p>Error loading HLS stream: {error.detail.message}</p>}
      <video ref={videoRef} controls />
    </div>
  );
};

export default VideoPlayer;
