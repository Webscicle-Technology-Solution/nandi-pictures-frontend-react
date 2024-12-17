"use client"
import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'


const AuthNav = () => {
    const pathname = usePathname()
    const uRL = pathname.includes("login")?"signup":"login"

  return (
    <>
    <div className="flex justify-between items-center shadow-lg pt-5 pb-4 pl-8 pr-8 ">
        {/* <img src="/logo.png" alt="Next.js logo" width={150} height={38} /> */}
        {/* <div className='relative h-[100px] w-[150px]'> */}
        <div className='relative w-[180px] h-[70px]'>
        <Image src="/logo.png" fill alt="Next.js logo"></Image>
        </div>
        {/* <Image src="/logo.png" height={100} width={200} alt="Next.js logo"></Image> */}
        {/* </div> */}
        <a href={`/${uRL}`}>
        <h2 className="underline hover:cursor-pointer">{uRL.charAt(0).toUpperCase() + uRL.slice(1)}</h2>

        </a>
      </div>
      {/* Horizontal line */}
      <hr className="border-t-1 border-foreground" />
      
      </>
  )
}

export default AuthNav