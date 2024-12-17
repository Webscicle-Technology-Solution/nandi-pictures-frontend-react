"use client";

import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Using react-icons for eye toggle
import { useState } from 'react';


const InputFields = (props) => {

    const [passwordVisible, setPasswordVisible] = useState(false);

    const [password, setPassword] = useState("")

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
        if (propType === 'password') {
          setPropType('text');
        } else {
          setPropType('password');
        }
      };

      const [propType, setPropType] = useState(props.type);

      const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        props.handleChange(e);
      };
    

  return (
    <div className="">
        <div className='flex w-full relative items-center justify-center'>
        <input 
        type={propType}
        name={props.type}
        placeholder={props.placeholder}
        onChange={handlePasswordChange}
        className={`input-primary ${props.Error ? 'input-error' : ''} z-0`} // Highlight input on error 
      />
      
      {props.type=='password' && password? <div className="hover:text-gray-950 text-[1.3rem] text-gray-600 z-10 absolute inset-y-[16.5%] right-3 flex items-start pt-3 pl-3 cursor-pointer " onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div> :<div>&nbsp;</div>}
            </div>         

      
      <p className="error-message">{props.Error}</p>

      
      
    </div>
  );
};

export default InputFields;
