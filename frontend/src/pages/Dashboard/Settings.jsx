import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/Cards/InfoCard';
import { FaUserCog, FaBell, FaLock } from 'react-icons/fa';
import { BiSolidCog } from 'react-icons/bi';
import { useUserAuth } from '../../hooks/useUserAuth';

const Settings = () => {
  useUserAuth();

  const navigate = useNavigate();
  
  const [settingsData, setSettingsData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSettingsData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.SETTINGS.GET_DATA}`);

      if (response.data) {
        setSettingsData(response.data);
      }

    } catch (error) {
      console.log("Something went wrong, Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettingsData();
  }, []);

  return (
    <DashboardLayout activeMenu="Settings">
      <div className='my-5 mx-auto max-w-7xl px-6'>
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Settings</h2>

        {/* Settings Cards */}
        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-6 transition-all ease-in-out duration-500'>
          <div className='lg:col-span-1 md:col-span-2'>
            <InfoCard
              icon={<FaUserCog />}
              label="Profile Settings"
              value="Manage your personal information"
              color="bg-primary"
              onClick={() => navigate('/profile')}
            />
          </div>
          <div className='col-span-1'>
            <InfoCard
              icon={<FaBell />}
              label="Notifications"
              value="Adjust notification preferences"
              color="bg-blue-600"
              onClick={() => navigate('/notifications')}
            />
          </div>
          <div className='col-span-1'>
            <InfoCard
              icon={<FaLock />}
              label="Security Settings"
              value="Update your password and security settings"
              color="bg-red-600"
              onClick={() => navigate('/security')}
            />
          </div>
        </div>

        {/* General Settings */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
          <div className="lg:col-span-1 md:col-span-2">
            <InfoCard
              icon={<BiSolidCog />}
              label="General Settings"
              value="Set language preferences, themes, and more"
              color="bg-green-700"
              onClick={() => navigate('/general')}
            />
          </div>
        </div>

        {/* Additional Settings Section */}
        <div className="mt-8">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Account Settings</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="col-span-1">
              <InfoCard
                icon={<FaUserCog />}
                label="User Management"
                value="Manage user roles and permissions"
                color="bg-indigo-500"
                onClick={() => navigate('/users')}
              />
            </div>
            <div className="col-span-1">
              <InfoCard
                icon={<BiSolidCog />}
                label="App Preferences"
                value="Customize your app's behavior"
                color="bg-teal-500"
                onClick={() => navigate('/preferences')}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
