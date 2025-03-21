import React, { useState, useEffect } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate } from 'react-router-dom'; 
import CircularProgress from '@mui/material/CircularProgress'; 
import { TbLayoutDashboardFilled } from "react-icons/tb";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.AUTH.GET_USER);
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load user data');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
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
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <button className='hover:scale-105' onClick={() => navigate('/dashboard')}>
          <TbLayoutDashboardFilled size={30} />
        </button>

        <div className="flex flex-col items-center mt-4">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          <h3 className="mt-4 text-3xl font-bold text-gray-800">{user?.fullName}</h3>
          <p className="text-lg text-gray-600">{user?.email}</p>
        </div>

        <div className="mt-8 border-t pt-6">
          <h4 className="text-2xl font-semibold text-gray-700 mb-4">Account Details</h4>
          <p className="text-gray-600">
            <span className="font-medium">Member Since:</span> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default UserInfo;
