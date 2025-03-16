import React from 'react'
import { useState } from 'react';
import { FaRegEye , FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({value, label, placeholder, onChange, type}) => {

  const  [ showPassword , setShowPassword ] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className='text-[13px] text-slate-800 '> {label} </label>
      
      <div className='input-box'>
        <input 
          type = {type == "password" ? showPassword ? "text" : "password" : type}
          placeholder={placeholder}
          value={value}
          onChange={(e)=> onChange(e)}
          className='w-full bg-transparent outline-none'
        />

        {type === "password" && (
          <div>
            {showPassword ? (
              <FaRegEye
                size={22}
                className='text-blue-500 cursor-pointer'
                onClick={()=> toggleShowPassword()}
            />) : (
              <FaRegEyeSlash
                size={22}
                className='text-slate-500 cursor-pointer'
                onClick={() => toggleShowPassword()}
              />
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default Input;