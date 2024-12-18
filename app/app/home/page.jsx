import SearchBar from '@/app/component/homeComponents/SearchBar'
import React from 'react'

const page = () => {
  return (
    <div className='h-full bg-red-400 flex flex-col justify-between '>
    
        <SearchBar/>
        <div>ITEM 2</div>
    </div>
  )
}

export default page