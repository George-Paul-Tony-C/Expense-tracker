import React from 'react';

const UserProfileCard = ({ user, onUpdateProfile }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5">
      <h3 className="text-xl font-semibold text-gray-700">User Profile</h3>
      <div className="mt-4">
        <p className="text-gray-600">Name: {user?.name || 'N/A'}</p>
        <p className="text-gray-600">Email: {user?.email || 'N/A'}</p>
        <button
          onClick={onUpdateProfile}
          className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfileCard;
