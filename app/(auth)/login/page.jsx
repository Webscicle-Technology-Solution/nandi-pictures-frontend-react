'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputFields from '@/app/component/formComponents/inputFields/InputFields';
import useAuthStore from '../authStore';

const Page = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmailID(value);
    setEmailError(!value ? 'Email is required' : 
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? 
      'Email is not valid' : '');
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(!value ? 'Password is required' : 
      value.length < 4 ? 'Password must be at least 4 characters' : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate fields
    if (!emailID) setEmailError('Email is required');
    if (!password) setPasswordError('Password is required');
    if (emailError || passwordError) return;

    // Attempt login
    const result = await login(emailID, password);
    
    if (result.success) {
      router.push('/app/home');
    } else {
      alert(result.error || 'Login failed');
    }
  };

  return (
    <div>
      <div className="text-center mt-14 mb-10">
        <h1>Welcome Back to Nandi Pictures</h1>
        <h3>
          Login and Start Watching your favorite <br />
          movies today
        </h3>
      </div>

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