// DashboardLayout.jsx
import React from 'react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

const DashboardLayout = ({ children }) => (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Navbar />
      <main className="p-6 flex-1 bg-gray-100">{children}</main>
    </div>
  </div>
);

export default DashboardLayout;