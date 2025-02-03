"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { IoIosPlayCircle } from "react-icons/io";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import getMovieAction from "@/app/utils/getMovieAction";
import { useRouter } from "next/navigation";
import useAuthStore from "@/app/(auth)/authStore";

const FilmCardCarousel = ({ movies = [], vidType }) => {
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();
  
  const [isHovered, setIsHovered] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [userSubscription, setUserSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  


  useEffect(() => {
    const fetchUserSubscription = async () => {
      if (!isAuthenticated) {
        setUserSubscription(null);
        setLoading(false);
        return;
      }

      try {
        const response = await checkAuth();
        if (response?.user?.subscriptionId?.subscriptionTypeId?.name) {
          setUserSubscription(response.user.subscriptionId.subscriptionTypeId.name);
        }
      } catch (error) {
        console.error("Error fetching user subscription:", error);
        setUserSubscription(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSubscription();
  }, [isAuthenticated, checkAuth, setUserSubscription]);

  const handleFavClick = () => {
    setIsFav(!isFav);
  };

  const handleWatchNow = (movie) => {
    const action = getMovieAction(movie, userSubscription);
    
    switch (action) {
      case 'login':
        router.push('/login');
        break;
        
      case 'watchNow':
        router.push(`/watch/${movie._id}`);
        break;
        
      case 'rent':
        router.push(`/rent/${movie._id}`);
        break;
        
      case 'subscribe':
        router.push('/subscribe');
        break;
        
      case 'error':
      default:
        router.push('/error');
        break;
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: false,
    centerMode: false,
  };

  return (
    <div className="w-[76vw] flex flex-col gap-10 overflow-visible">
      <div className="align-self-start!">
        <Slider {...settings} className="overflow-visible">
          {movies.map((item, index) => (
            <div key={index}>
              <div className="mt-5 ml-3 mb-5 h-[400px] bg-gray-900 rounded-lg overflow-hidden shadow-lg text-white cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl hover:z-20 mr-2">
                <div className="h-[100px]">
                  <div className="relative w-full h-[400px]">
                    <Image
                      src={item.imageSrc || "/poster.jpg"}
                      alt={item.title || "Movie Title"}
                      fill
                      style={{ objectFit: "cover" }}
                      className="opacity-90 rounded-lg"
                    />
                  </div>
                </div>

                <Link href={`/app/details/${vidType}/${item._id}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                </Link>

                <div className="absolute top-6 left-4 text-[15px] font-semibold pr-10 overflow-clip">
                  {item.title}
                </div>

                {item.showStar && (
                  <div className="absolute top-5 items-end justify-end w-full flex flex-col pr-3">
                    <div
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onClick={handleFavClick}
                    >
                      <FaStar 
                        color={isFav ? "#FFBF00" : "#f2f2f2"} 
                        size={35} 
                      />
                    </div>

                    {isHovered && (
                      <span className="absolute top-10 mr-2 mt-1 text-sm text-white font-medium bg-black/90 p-2 text-[0.6rem] pr-3 rounded-lg">
                        {isFav ? "Added to Favorites" : "Add to Favorites"}
                      </span>
                    )}
                  </div>
                )}

                <div
                  onClick={() => handleWatchNow(item)}
                  className="absolute pt-2 bottom-4 ml-2 pl-3 pr-3 pb-2 flex items-center space-x-2 hover:bg-white/40 rounded-xl cursor-pointer"
                >
                  <IoIosPlayCircle size={40} color="#FFBF00" />
                  <span className="text-lg font-light">Watch Now</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FilmCardCarousel;