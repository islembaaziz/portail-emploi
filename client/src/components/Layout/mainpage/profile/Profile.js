import React, { useEffect, useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../../redux/features/auth/authSlice'; // Update the path to your authSlice
import axios from 'axios';
import { API } from '../../../../constant';
import PopUpProfilUpdate from './popupprofileupdate/PopUpProfilUpdate';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.post(
            `${API}/user/getUser`,
            { token },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.success) {
            dispatch(setUser(response.data.data));
          } else {
            console.error('Error fetching user data:', response.data.message);
          }
        } else {
          console.error('Token not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [dispatch]);

  const getInitials = (name, lastName) => {
    return name.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  };

  const reloadParentPage = () => {
    window.location.reload(); // Reloads the current page
  };

  return (
    <div className="bg-white max-w-auto shadow overflow-hidden sm:rounded-lg">
      {user ? (
        <div className="flex items-center justify-around">
          <div className="flex justify-center items-center">
            <div className="inline-flex items-center justify-center w-12 h-12 text-xl text-white bg-teal-600 rounded-full">
              <div>{getInitials(user.name, user.lastName)}</div>
            </div>
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Votre profil
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Détails et informations sur l'utilisateur.
              </p>
            </div>
          </div>
          <div className="flex gap-4 justify-center items-center">
            {popupOpen && (
              <PopUpProfilUpdate
                setPopupOpen={setPopupOpen}
                reloadParentPage={reloadParentPage}
              />
            )}
            <button
              className="flex items-center gap-1 text-gray-500 hover:text-gray-900 focus:outline-none"
              onClick={() => setPopupOpen(!popupOpen)}
            >
              <span>Modifier votre profil</span>
              <PencilSquareIcon className="text-xl h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {user && (
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Nom</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.name}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Prénom</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.lastName}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.email}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Adresse</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.adresse}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">About</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                To get social media testimonials like these, keep your customers
                engaged with your social media accounts by posting regularly
                yourself
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
};

export default Profile;
