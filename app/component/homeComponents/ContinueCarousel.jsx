import React from "react";
// import FilmCard from "./FilmCard";
import Slider from "react-slick";
import ContinueFilmCard from "../reuseable/ContinueFilmCard";
import FilmCard from "../reuseable/FilmCard";

const ContinueCarousel = () => {
  const movieList = [
    {
      imageSrc: "/poster.jpg", // Default placeholder image
      title: "THE RISE OF SUDARSHAN CHAKRA", // Default title
      showStar: true, // Show or hide Star button
      filmDetailUrl: "/app/details/movies/1", // Default film detail URL
    },
    {
      imageSrc: "/poster.jpg", // Default placeholder image
      title: "THE 2", // Default title
      showStar: true, // Show or hide Star button
      filmDetailUrl: "/app/details/movies/2", // Default film detail URL
    },
    {
      imageSrc: "/poster.jpg", // Default placeholder image
      title: "THE 3", // Default title
      showStar: true, // Show or hide Star button
      filmDetailUrl: "/app/details/movies/3", // Default film detail URL
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
    <div className="w-[76vw] flex flex-col gap-10 overflow-visible">
     

      <div className="align-self-start! ">
        <Slider {...settings} className="overflow-visible ">
          {movieList.map((item, index) => (
            // Each FilmCard should be inside its own slide
            <ContinueFilmCard {...item} key={index} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ContinueCarousel;
