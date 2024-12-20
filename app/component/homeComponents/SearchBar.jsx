"use client"
import React from 'react'

const SearchBar = () => {

  return (
    <div className='flex-col justify-center items-center'>
        <div className='w-full sm:w-auto flex'>
            <input 
                placeholder='Search' 
                className='p-5 rounded-[10px] h-[46px] bg-gray-200 border-[2px] border-[#e6ad35] focus:outline-none focus:ring-1 focus:ring-[#e6ad35] w-full sm:w-[350px] xs:w-[250px]'
            />
            <button className='bg-[#0C0C0C] rounded-[10px] h-[47px] ml-[-28px] text-[#e6ad35] sm:w-[120px] xs:w-[90px]'>
                Search
            </button>
        </div>
    </div>
  )
}

export default SearchBar
