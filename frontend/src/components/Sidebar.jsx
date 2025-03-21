// Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <aside className="w-56 bg-slate-950 text-white min-h-screen p-6 shadow-md">
    <h2 className="text-2xl font-bold mb-8 text-light-blue transition duration-300 hover:text-white">
      Dashboard
    </h2>
    <nav>
      <SidebarLink to="/dashboard" label="Home" />
      <SidebarLink to="/income" label="Income" />
      <SidebarLink to="/expense" label="Expense" />
    </nav>
  </aside>
);

const SidebarLink = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block py-3 px-5 mb-3 rounded-lg transform transition-all duration-300 ease-in-out ${
        isActive
          ? 'bg-blue-700 text-white shadow-lg scale-105'
          : 'text-light-blue hover:bg-blue-700 hover:text-white hover:scale-105 active:shadow-md'
      }`
    }
  >
    {label}
  </NavLink>
);

export default Sidebar;