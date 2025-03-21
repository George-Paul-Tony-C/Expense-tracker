// Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaBell, FaCog } from 'react-icons/fa';

const Navbar = () => (
  <nav className="bg-blue-700 text-white flex justify-between items-center px-8 py-4 shadow-lg">
    <h1 className="text-3xl font-bold tracking-wide hover:text-light-blue transition duration-300">
      Welcome
    </h1>
    <ul className="flex items-center space-x-6">
      <NavbarLink to="/userinfo" icon={<FaUser size={24} />} label="Profile" />
      <NavbarLink to="/notifications" icon={<FaBell size={24} />} label="Notifications" />
      <NavbarLink to="/settings" icon={<FaCog size={24} />} label="Settings" />
    </ul>
  </nav>
);

const NavbarLink = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center py-2 px-4 rounded-lg transition-all duration-300 ${
        isActive
          ? 'bg-blue-500 text-white shadow-md'
          : 'hover:bg-blue-600 hover:text-white active:scale-95'
      }`
    }
  >
    <span className="mr-2">{icon}</span>
    <span>{label}</span>
  </NavLink>
);

export default Navbar;