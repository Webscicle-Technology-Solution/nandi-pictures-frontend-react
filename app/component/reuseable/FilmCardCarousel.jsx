import React from "react";
import FilmCard from "./FilmCard";
import Slider from "react-slick";

const FilmCardCarousel = () => {
  const movieList = [
    {
      imageSrc: "/poster.jpg", // Default placeholder image
      title: "THE RISE OF SUDARSHAN CHAKRA", // Default title
      showContinueWatch: true, // Show or hide Continue Watch
      showStar: true, // Show or hide Star button
      filmDetailUrl: "/login", // Default film detail URL
    },
    {
      imageSrc: "/poster.jpg", // Default placeholder image
      title: "THE 2", // Default title
      showContinueWatch: true, // Show or hide Continue Watch
      showStar: true, // Show or hide Star button
      filmDetailUrl: "/login", // Default film detail URL
    },
    {
      imageSrc: "/poster.jpg", // Default placeholder image
      title: "THE 3", // Default title
      showContinueWatch: true, // Show or hide Continue Watch
      showStar: true, // Show or hide Star button
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
      <h4>Continue Watching</h4>

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

export default FilmCardCarousel;
