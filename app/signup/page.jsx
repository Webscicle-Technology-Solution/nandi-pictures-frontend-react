import React from 'react';
import Image from 'next/image';

const Page = () => {
  return (
    <div>
      {/* Topbar */}
      {/* <div className='pt-5 pb-3 pr-5 pl-5'> */}
      <div className="flex justify-between items-center shadow-lg pt-5 pb-4 pl-8 pr-8 ">
        {/* <img src="/logo.png" alt="Next.js logo" width={150} height={38} /> */}
        {/* <div className='relative h-[100px] w-[150px]'> */}
        <Image src="/logo.png" height={150} width={200} alt="Next.js logo"></Image>
        {/* </div> */}
        <h2 className="underline hover:cursor-pointer">Login</h2>
      </div>
      {/* Horizontal line */}
      <hr className="border-t-1 border-foreground" />
    
      {/* </div> */}
      {/* Welcome Section */}
      <div className="text-center pt-10">
        <h1>Welcome to  NANDI PICTURES
        </h1>
        <h3>
        Start Watching your favorite movies<br />   
         today
        </h3>
      </div>
    {/*INPUT */}
    <div className="text-center pt-10">
    <input type="text" placeholder="Email" className="input-primary" />
<br/>
<input type="text" placeholder="Phone Number" className="input-primary" />
  <br />
  <input type="password" placeholder="Password" className="input-primary" />
  <br />
  <input type="password" placeholder="Confirm Password" className="input-primary" />


</div>

      {/* Login Button */}
      <div className="text-center mt-6">
        <div className='button-primary backprim'>
        <a href="#" className="">
          SignUp
        </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
