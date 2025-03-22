import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = ({ children}) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className='bg-gray-100'>
      <div className={`flex min-h-screen ${openSideMenu ? 'bg-opacity-30 backdrop-blur-sm' : ''}`}>
        {/* Sidebar Component */}
        <Sidebar isOpen={openSideMenu} setIsOpen={setOpenSideMenu} />
        
        {/* Main Content */}
        <div className={`flex-1 flex flex-col lg:ml-64 md:ml-64 transition-all duration-300 ${openSideMenu ? 'opacity-50' : ''}`}>
          {/* Navbar Component */}
          <Navbar setOpenSideMenu={setOpenSideMenu} openSideMenu={openSideMenu} />
          
          {/* Main Body */}
          <main className="p-1 lg:mr-3 sm:mr-2 sm:ml-2 not-sm:mx-2 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
