import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FeaturedMovie from './FeaturedMovie';

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
    customPaging: (i) => (
      <div className="custom-dot">
        {/* Style each dot (e.g., circles, or shapes based on your design) */}
        <div className="dot-circle"></div>
      </div>
    ),
    appendDots: dots => (
      <div>
        <ul> {dots} </ul>
      </div>
    )
  };

  return (
    <div className="carousel-container" style={{ height: '600px' }}>
      <Slider {...settings}>
        <div className='-z-10'><FeaturedMovie /></div>
        <FeaturedMovie />
        <FeaturedMovie />
      </Slider>
    </div>
  );
};

export default FeaturedCarousel;
