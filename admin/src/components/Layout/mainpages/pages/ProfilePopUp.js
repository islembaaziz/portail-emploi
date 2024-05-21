import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { APII } from '../../../../constant';

const ProfilePopUp = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md mx-4 sm:mx-auto">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-2xl font-bold text-gray-800">Profile d'utilisateur</h2>
          <XMarkIcon
            onClick={onClose}
            className="h-6 w-6 text-gray-600 hover:text-red-600 cursor-pointer"
          />
        </div>
        <div className="space-y-4">
          <div className="text-gray-700">
            <strong className="block font-medium">Nom et Prénom :</strong> 
            <span className="text-gray-900">{user.name} {user.lastName}</span>
          </div>
          <div className="text-gray-700">
            <strong className="block font-medium">Email:</strong> 
            <span className="text-gray-900">{user.email}</span>
          </div>
          <div className="text-gray-700">
            <strong className="block font-medium">Address:</strong> 
            <span className="text-gray-900">{user.adresse}</span>
          </div>
          <div className="text-gray-700">
            <strong className="block font-medium">Role:</strong> 
            <span className="text-gray-900">{user.role}</span>
          </div>
          <div className="text-gray-700">
            <strong className="block font-medium">CV:</strong> 
            <a className='text-blue-600 underline' href={`${APII}/uploads/${user.cv}`} target="_blank" rel="noopener noreferrer">Consulter CV</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopUp;
