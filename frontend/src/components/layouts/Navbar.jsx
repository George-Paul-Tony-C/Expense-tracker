import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaBell, FaCog } from 'react-icons/fa';
import { HiOutlineX, HiOutlineMenu } from 'react-icons/hi';

const Navbar = ({ setOpenSideMenu, openSideMenu }) => {
  return (
    <nav
      className={`my-3 md:ml-0 mr-3 not-sm:ml-3 sm:ml-3 rounded-2xl flex gap-5 backdrop-blur-2xl bg-white shadow-md shadow-gray-200 border border-gray-200/50 py-4 px-7 sticky top-3 z-30 ${
        openSideMenu ? 'opacity-50 backdrop-blur-md' : ''
      }`}
    >
      {/* Mobile menu toggle */}
      <button
        className="block lg:hidden md:hidden text-black"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {!openSideMenu && (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      {/* Navbar Title */}
      <h2 className="text-xl font-medium text-black">Expense Tracker</h2>

      {/* Navbar Links for larger screens */}
      <div className="hidden md:flex lg:flex gap-3 ml-auto text-[15px]">
        <NavbarLink to="/userinfo" icon={<FaUser />} label="Profile"/>
        <NavbarLink to="/notifications" icon={<FaBell />} label="Notifications" />
        <NavbarLink to="/settings" icon={<FaCog />} label="Settings" />
      </div>
    </nav>
  );
};

const NavbarLink = ({ to, icon}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center py-2 px-3 rounded-lg transition-all duration-300 ${
        isActive
          ? 'bg-blue-500 text-white shadow-md'
          : 'hover:bg-blue-600 hover:text-white active:scale-95'
      }`
    }
  >
    <span className="">{icon}</span>
  </NavLink>
);

export default Navbar;
