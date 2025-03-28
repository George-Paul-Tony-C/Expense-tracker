import React from 'react';
import login_bg from '../../assests/images/login_bg.png';
import {LuTrendingUpDown} from 'react-icons/lu'

const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 '>
            <h2 className='text-2xl font-bold text-black'>Expense Tracker</h2>
            {children}
        </div>
        <div className='hidden md:block w-[40vw] h-screen bg-blue-50 bg-auth-bg-img bg-cover bg-no-repeat overflow-hidden p-8 relative'>
          <div className='w-48 h-48 rounded-[40px] bg-blue-700 absolute -top-7 -left-5'></div>
          <div className='w-48 h-56 rounded-[40px] border-[20px] border-indigo-800 absolute top-[30%] -right-10'></div>
          <div className='w-48 h-48 rounded-[40px] bg-blue-500 absolute -bottom-7 -left-5'></div>

          <div className='grid grid-cols-1 z-20'>
            <StatsInfoCard 
              icon = {<LuTrendingUpDown/>} 
              label = "Tract Your Income & Expenses"
              value = "430,000"
              color = "bg-primary"
            />

          </div>

          <img src={login_bg} alt="BackGround" className='transition-all ease-in-out w-64 lg:w-[80%] rounded-3xl absolute bottom-10 shadow-lg z-10' />
        </div>
    </div>
  )
}

export default AuthLayout;



const StatsInfoCard = ({icon , label , value, color}) => {
  return (
    <div className='flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-blue-400/10 border border-gray-200/50 z-50'>
      <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl `}>
        {icon}
      </div>
      <div>
        <h6 className='text-xs text-gray-400 mb-1'>{label}</h6>
        <span className='text-[20px]'>${value}</span>
      </div>
    </div>
  )
}