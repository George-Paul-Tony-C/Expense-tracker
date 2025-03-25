import React, { useState, useEffect } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate } from 'react-router-dom'; 
import CircularProgress from '@mui/material/CircularProgress'; 
import { TbLayoutDashboardFilled } from "react-icons/tb";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import Tooltip from '@mui/material/Tooltip'; // Import Tooltip

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  const { clearUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
        setUser(JSON.parse(storedUser));
        setLoading(false);
    } else {
        // Fetch from API if not in localStorage
        const fetchUser = async () => {
            try {
                const res = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
                setUser(res.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load user data');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    clearUser();
    navigate('/login');
  };

  if (loading) {
    return (
      <AuthLayout>
        <div className="flex justify-center items-center h-full w-full">
          <CircularProgress size="3rem" color="primary" />
        </div>
      </AuthLayout>
    );
  }

  if (error) {
    return (
      <AuthLayout>
        <div className="flex justify-center items-center h-full w-full">
          <p className="text-red-500">{error}</p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-xl rounded-lg">
        {/* Dashboard Button with Tooltip */}
        <Tooltip title="Go to Dashboard" arrow> {/* Tooltip added here */}
          <button
            className="top-6 right-6 text-gray-700 hover:text-blue-500 transition"
            onClick={() => navigate('/dashboard')}
          >
            <TbLayoutDashboardFilled size={28} />
          </button>
        </Tooltip>

        <div className="flex flex-col items-center space-y-6">
          {/* Profile Image */}
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-gray-200 shadow-lg"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
              No Image
            </div>
          )}
          
          {/* User Info */}
          <div className="text-center">
            <h3 className="text-4xl font-semibold text-gray-800">{user?.fullName}</h3>
            <p className="text-xl text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* Account Details */}
        <div className="mt-8 border-t pt-6">
          <h4 className="text-2xl font-semibold text-gray-700 mb-4">Account Details</h4>
          <p className="text-gray-600">
            <span className="font-medium">Member Since:</span> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-between space-x-6">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default UserInfo;
