import React from 'react';
import FilmCard from './FilmCard';
import Slider from 'react-slick';

const FilmCardCarousel = () => {
  const movieList = [
    {
      imageSrc: '/poster.jpg', // Default placeholder image
      title: 'THE RISE OF SUDARSHAN CHAKRA', // Default title
      showContinueWatch: true, // Show or hide Continue Watch
      showStar: true, // Show or hide Star button
      filmDetailUrl: '/login', // Default film detail URL
    },
    {
      imageSrc: '/poster.jpg', // Default placeholder image
      title: 'THE 2', // Default title
      showContinueWatch: true, // Show or hide Continue Watch
      showStar: true, // Show or hide Star button
      filmDetailUrl: '/login', // Default film detail URL
    },
    {
      imageSrc: '/poster.jpg', // Default placeholder image
      title: 'THE 3', // Default title
      showContinueWatch: true, // Show or hide Continue Watch
      showStar: true, // Show or hide Star button
      filmDetailUrl: '/login', // Default film detail URL
    },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4, // Show 1 card per slide
    slidesToScroll: 2, // Scroll 1 card at a time
    arrows: false,
    centerMode:false,
  };

  return (
    <div>
      <h4>Continue Watching</h4>
      <div className='film-carousel-wrapper'>

      <Slider {...settings}>
        {movieList.map((item, index) => (
          // Each FilmCard should be inside its own slide
          <div key={index}>
            <FilmCard {...item} /> 
          </div>
        ))}
      </Slider>
    </div>
    </div>

  );
};

export default FilmCardCarousel;
