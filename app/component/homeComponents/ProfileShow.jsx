import React from 'react'
import  Image from 'next/image'
const ProfileShow = () => {
  return (
    <div className='rounded-full w-[50px] h-[50px] border-2 border-[#e6ad35] p-2'>
        <Image src="/logo-only.png" width={50} height={50} alt="profile"></Image>
    </div>
  )
}

export default ProfileShow