import React, { useEffect, useRef , useContext } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { FaHome, FaWallet, FaChartBar } from 'react-icons/fa'; // Example icons
import { NavLink, useNavigate } from 'react-router-dom';
import { TbLayoutDashboardFilled , TbLogout } from "react-icons/tb";
import { FaUser, FaCog } from 'react-icons/fa'; // Icons for profile and settings
import { UserContext } from '../../context/userContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const sidebarRef = useRef(null);

    const navigate = useNavigate();

  const { user , clearUser } = useContext(UserContext);

  // Close the sidebar if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false); // Close the sidebar if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    clearUser();
    navigate('/login');
  }

  return (
    <aside
      ref={sidebarRef}
      className={`w-56 mt-3 mx-4 p-6 border-2 border-white bg-slate-950 rounded-3xl text-white shadow-lg shadow-gray-600 transition-all ease-linear duration-300 ${isOpen ? 'block z-40' : 'hidden'} md:block fixed top-0 left-0`}
      style={{
        zIndex: 40,
        top: 0,
        left: 0,
        height: '96vh',
      }}
    >
      <div className="flex flex-col items-center mt-3 mb-6">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
          ) : (
            <img
              src="default_user.png"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
          )}
          {user?.fullName ? (
            <h3 className="mt-2 text-2xl font-bold text-white">{user?.fullName}</h3>
          ) : (
            <h3 className="mt-2 text-2xl font-bold text-white">User</h3>
          )}
        </div>
      <nav>
        <SidebarLink to="/dashboard" label="Home" icon={<TbLayoutDashboardFilled className="mr-3 text-2xl" />} />
        <SidebarLink to="/income" label="Income" icon={<FaWallet className="mr-3 text-2xl" />} />
        <SidebarLink to="/expense" label="Expense" icon={<FaChartBar className="mr-3 text-2xl" />} />
        <SidebarLink to="/userinfo" label="Profile" icon={<FaUser className="mr-3 text-2xl" />} />
        <SidebarLink to="/settings" label="Settings" icon={<FaCog className="mr-3 text-2xl" />} />
      </nav>

      {/* Logout button */}
      <div className="absolute bottom-1 w-44 ">
        <button
          onClick={handleLogout}
          className="w-full block font-bold py-3 px-5 mb-3 text-md rounded-lg
           transform transition-all duration-300 ease-in-out text-light-blue
            hover:bg-blue-700 hover:text-white hover:scale-105 active:shadow-md
            active:bg-red-700"
        >
          <div className="flex items-center gap-2 justify-center">
            <div className='text-2xl'><TbLogout /></div>
            <span>Logout</span>
          </div>
        </button>
      </div>
    </aside>
  );
};

const SidebarLink = ({ to, label, icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block font-bold py-3 px-5 mb-3 text-md rounded-lg transform transition-all duration-300 ease-in-out ${
        isActive
          ? 'bg-blue-700 text-white shadow-lg scale-105'
          : 'text-light-blue hover:bg-blue-700 hover:text-white hover:scale-105 active:shadow-md'
      }`
    }
  >
    <div className="flex items-center">
      {icon}
      {label}
    </div>
  </NavLink>
);

export default Sidebar;
