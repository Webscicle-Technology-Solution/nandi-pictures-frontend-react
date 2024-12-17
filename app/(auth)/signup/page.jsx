"use client";

import React, { useState } from 'react';
import InputFields from '@/app/component/formComponents/inputFields/InputFields';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Using react-icons for eye toggle

const Page = () => {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [confirmPassError, setConfirmPassError] = useState('');

  const [emailID, setEmailID] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPass, setConfirmPass] = useState('');


  // Handle Input Changes and Validation
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

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    if (!value) {
      setPhoneError('Phone Number is required');
    } else if (!/^\d{10}$/.test(value)) {
      setPhoneError('Phone Number is not valid');
    } else {
      setPhoneError('');
    }
  };

  const handleConfirmPassChange = (e) => {
    const value = e.target.value;
    setConfirmPass(value);
    if (!value) {
      setConfirmPassError('Confirm Password is required');
    } else if (value !== password) {
      setConfirmPassError('Password and Confirm Password do not match');
    } else {
      setConfirmPassError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation check before submission
    let isValid = true;

    if (!emailID) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailID)) {
      setEmailError('Email is not valid');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    }

    if (!phone) {
      setPhoneError('Phone Number is required');
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      setPhoneError('Phone Number is not valid');
      isValid = false;
    }

    if (!confirmPass) {
      setConfirmPassError('Confirm Password is required');
      isValid = false;
    } else if (confirmPass !== password) {
      setConfirmPassError('Password and Confirm Password do not match');
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
      <div className="text-center mt-14 mb-12">
        <h1>Welcome to NANDI PICTURES</h1>
        <h3>Start Watching your favorite movies today</h3>
      </div>

      {/* Input Fields */}
      <form onSubmit={handleSubmit} >
        <div className="text-center w-full flex flex-col gap-3 justify-center items-center">
         
          <InputFields
            type="text"
            placeholder="Email"
            Error={emailError}
            handleChange={handleEmailChange}
          />
          
          <InputFields
            type="text"
            placeholder="Phone Number"
            Error={phoneError}
            handleChange={handlePhoneChange}
          />
      
            <InputFields
              type='password'
              placeholder="Password"
              Error={passwordError}
              handleChange={handlePasswordChange}
            />
       
            <InputFields
              type="password"
              placeholder="Confirm Password"
              Error={confirmPassError}
              handleChange={handleConfirmPassChange}
              
            />
         
           
  
        </div>

        {/* Submit Button */}
        <div className="text-center mt-10">
          <button type="submit" className="button-primary backprim">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
