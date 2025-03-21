import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

const Home = () => {
  return (
    <DashboardLayout>
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-3xl font-semibold mb-4">Welcome to the Dashboard</h2>
        <p className="text-lg">This is your home page where you can manage all your settings and data.</p>
      </div>
    </DashboardLayout>
  );
}

export default Home;
