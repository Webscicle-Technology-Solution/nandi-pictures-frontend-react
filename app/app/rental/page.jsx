import React from 'react'
import RentalFilmCard from '@/app/component/rental/RentalFilmCard'
import SearchBar from '@/app/component/homeComponents/SearchBar'
import ProfileShow from '@/app/component/homeComponents/ProfileShow'

const page = () => {
  const rentalFilms = [
    {
      title: "The Rise of Sudarshan Chakra",
      expiringTime: "2hrs",
      bio: "A biopic on the journey of life of Jain Saint Shri Sudarshan Lal Ji Maharaj.",
      duration: "2hr 31min",
      image: "/poster.jpg" // Replace with your actual image path
    },
    {
      title: "The Rise of Sudarshan Chakra",
      expiringTime: "2hrs",
      bio: "A biopic on the journey of life of Jain Saint Shri Sudarshan Lal Ji Maharaj.",
      duration: "2hr 31min",
      image: "/poster.jpg" // Replace with your actual image path
    },
    {
      title: "The Rise of Sudarshan Chakra",
      expiringTime: "2hrs",
      bio: "A biopic on the journey of life of Jain Saint Shri Sudarshan Lal Ji Maharaj.",
      duration: "2hr 31min",
      image: "/poster.jpg" // Replace with your actual image path
    },
    {
      title: "The Rise of Sudarshan Chakra",
      expiringTime: "2hrs",
      bio: "A biopic on the journey of life of Jain Saint Shri Sudarshan Lal Ji Maharaj.",
      duration: "2hr 31min",
      image: "/poster.jpg" // Replace with your actual image path
    },
    {
      title: "The Rise of Sudarshan Chakra",
      expiringTime: "2hrs",
      bio: "A biopic on the journey of life of Jain Saint Shri Sudarshan Lal Ji Maharaj.",
      duration: "2hr 31min",
      image: "/poster.jpg" // Replace with your actual image path
    },
    {
      title: "The Rise of Sudarshan Chakra",
      expiringTime: "2hrs",
      bio: "A biopic on the journey of life of Jain Saint Shri Sudarshan Lal Ji Maharaj.",
      duration: "2hr 31min",
      image: "/poster.jpg" // Replace with your actual image path
    }
  ];

  return (
    <div>
      <div className="flex flex-row justify-between items-center w-full mb-10">
        <SearchBar />
        <ProfileShow />
      </div>

      <div className="flex flex-wrap justify-evenly items-start min-h-screen bg-gray-100 gap-5">
        {/* Map through rentalFilms data and render RentalFilmCard */}
        {rentalFilms.map((film, index) => (
          <div className='mb-10'  key={index}>
          <RentalFilmCard
            title={film.title}
            expiringTime={film.expiringTime}
            bio={film.bio}
            duration={film.duration}
            image={film.image}
          />
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
