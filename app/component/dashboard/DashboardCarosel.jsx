import React from "react";
import FilmCard from "../reuseable/FilmCard";
import Slider from "react-slick";

const DashboardCarosel = () => {
  const movieList = [
    {
      imageSrc: "/poster.jpg", // Default placeholder image
      title: "THE RISE OF SUDARSHAN CHAKRA", // Default title
      showContinueWatch: false, // Show or hide Continue Watch
      showStar: false, // Show or hide Star button
      filmDetailUrl: "/login", // Default film detail URL
    },
    {
      imageSrc: "/poster.jpg", // Default placeholder image
      title: "THE 2", // Default title
      showContinueWatch: false  , // Show or hide Continue Watch
      showStar: false, // Show or hide Star button
      filmDetailUrl: "/login", // Default film detail URL
    },
    {
      imageSrc: "/poster.jpg", // Default placeholder image
      title: "THE 3", // Default title
      showContinueWatch: false, // Show or hide Continue Watch
      showStar: false, // Show or hide Star button
      filmDetailUrl: "/login", // Default film detail URL
    },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 4, // Show 1 card per slide
    slidesToScroll: 2, // Scroll 1 card at a time
    arrows: false,
    centerMode: false,
  };

  return (
    <div className="w-[76vw] h-[800px] flex flex-col gap-10 overflow-visible">
     

      <div className="align-self-start! ">
        <Slider {...settings} className="overflow-visible ">
          {movieList.map((item, index) => (
            // Each FilmCard should be inside its own slide
            <FilmCard {...item} key={index} />
          ))}
        </Slider>
      </div>
    </div>
  );
};
export default DashboardCarosel;
