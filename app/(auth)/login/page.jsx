'use client';

import React, { useState } from 'react';
import InputFields from '@/app/component/formComponents/inputFields/InputFields';

const Page = () => {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmailID(value);
    if (!value) {
      setEmailError('Email is required');
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      setEmailError('Email is not valid');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!value) {
      setPasswordError('Password is required');
    } else if (value.length < 8) {
      setPasswordError('Password must be at least 8 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    // Reset errors


    if (!emailID) {
      setEmailError('Email is required');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (isValid) {
      // Proceed with form submission
      console.log('Form submitted');
    }
  };

  return (
    <div>    

      {/* Welcome Section */}
      <div className="text-center mt-14 mb-10">
        <h1>Welcome Back to Nandi Pictures</h1>
        <h3>
          Login and Start Watching your favorite <br />
          movies today
        </h3>
      </div>
      {/* Input Fields */}
      <form onSubmit={handleSubmit}>
      <div className="text-center w-full flex flex-col gap-3 justify-center items-center">

          <InputFields handleChange={handleEmailChange} Error={emailError} type="email" placeholder="Email"/>
          <InputFields handleChange={handlePasswordChange} Error={passwordError} type="password" placeholder="Password" />
          </div>
        {/* Login Button */}
        <div className="text-center mt-10">
         
            <button type="submit" className="button-primary backprim">
              Login
            </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
