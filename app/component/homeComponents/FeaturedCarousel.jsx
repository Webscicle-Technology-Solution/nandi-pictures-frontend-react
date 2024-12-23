import React from "react";
import Slider from "react-slick";
import FeaturedMovie from "./FeaturedMovie";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    customPaging: function (i) {
      return <div className="dot"></div>;
    },
    dotsClass: "slick-dots slick-thumb",
  };

  return (
    <div className="w-[75vw]">
      <Slider {...settings}>
        <FeaturedMovie />
        <FeaturedMovie />
        <FeaturedMovie />
      </Slider>
    </div>
  );
};

export default FeaturedCarousel;
