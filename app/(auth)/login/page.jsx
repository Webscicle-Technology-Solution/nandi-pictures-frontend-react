'use client';

import React, { useState } from 'react';
import InputFields from '@/app/component/formComponents/inputFields/InputFields';
import useAuthStore from '../authStore'; // Use default import instead of named import


const Page = () => {

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");

  const login = useAuthStore((state) => state.login); // Access login function from Zustand store

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
    } else if (value.length < 4) {
      setPasswordError('Password must be at least 4 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset errors
    setEmailError('');
    setPasswordError('');

    if (!emailID) {
      setEmailError('Email is required');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (isValid) {
      // Proceed with API call for login
      console.log('api:', `${apiBaseUrl}/auth/login`);
      try {
        const response = await fetch(`${apiBaseUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: emailID, password: password }),
        });

        const data = await response.json();

        if (response.ok) {
          // Successful login, store the tokens in Zustand
          const { accessToken, refreshToken, user } = data;

          // Store the tokens and user data in Zustand
          login(accessToken, refreshToken, user);

          // Redirect the user to the dashboard or home page
          window.location.href = '/app/home';  // Replace with actual route

        } else {
          // Handle login error
          alert(data.message || 'Login failed');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Something went wrong, please try again');
      }
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
          <InputFields 
            handleChange={handleEmailChange} 
            Error={emailError} 
            type="email" 
            placeholder="Email"
          />
          <InputFields 
            handleChange={handlePasswordChange} 
            Error={passwordError} 
            type="password" 
            placeholder="Password" 
          />
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
