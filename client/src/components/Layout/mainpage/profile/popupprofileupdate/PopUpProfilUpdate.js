import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../../../../constant';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const PopUpProfilUpdate = ({ setPopupOpen, reloadParentPage }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    adresse: '',
    userId: '', // Add userId to the form data
    cv: '', // CV file
    originalCV: '' // To keep the original CV value
  });
  console.log(formData);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.post(
            `${API}/user/getUser`,
            {}, // No need to send token in body
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.success) {
            const { name, lastName, email, adresse, userId, cv } = response.data.data;
            setFormData({ name, lastName, email, adresse, userId, originalCV: cv, cv: '' });
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
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      cv: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const userId = formData.userId; // Assuming userId is stored in formData from the initial fetch
      if (token && userId) {
        const formDataWithCV = new FormData();
        formDataWithCV.append('name', formData.name);
        formDataWithCV.append('lastName', formData.lastName);
        formDataWithCV.append('email', formData.email);
        formDataWithCV.append('adresse', formData.adresse);
        if (formData.cv) {
          formDataWithCV.append('cv', formData.cv); // Append the CV file to the form data if a new file is selected
        } else {
          formDataWithCV.append('cv', formData.originalCV); // Use the original CV if no new file is selected
        }

        const response = await axios.put(
          `${API}/user/update-user/${userId}`,
          formDataWithCV,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            },
          }
        );
        if (response.data.success) {
          toast.success('Profil mis à jour avec succès!');
          setPopupOpen(false); // Close the popup after successful update
          reloadParentPage(); // Reload or refresh the parent page
        } else {
          toast.error(`Erreur lors de la mise à jour du profil: ${response.data.message}`);
        }
      } else {
        toast.error('Token ou ID utilisateur introuvable.');
      }
    } catch (error) {
      toast.error(`Erreur lors de la mise à jour du profil: ${error.message}`);
    }
  };

  return (
    <div className="fixed bg-black bg-opacity-50 inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-md p-5 mx-auto my-6">
        <div className="relative bg-white rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
            <h3 className="text-3xl font-semibold">Modifier votre profil</h3>
            <XMarkIcon
              onClick={() => setPopupOpen(false)}
              className="h-8 w-8 text-red-600 cursor-pointer"
              aria-hidden="true"
            />
          </div>
          <div className="relative flex-auto p-6">
            <form onSubmit={handleSubmit}>
              <label>
                Votre Nom :
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mb-4 px-3 py-2 rounded-md w-full border-solid border-2 border-gray-400"
                />
              </label>
              <label>
                Votre Prénom :
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mb-4 px-3 py-2 rounded-md w-full border-solid border-2 border-gray-400"
                />
              </label>
              <label>
                Votre Email :
                <input
                  type="email"
                  name="email"
                  readOnly
                  disabled
                  className="mb-4 px-3 focus:ring-2 disabled:cursor-not-allowed border-gray-300 rounded-md py-2 disabled:opacity-50 disabled:bg-gray-200 disabled:text-gray-500 w-full border-solid border-2"
                  value={formData.email}
                />
              </label>
              <label>
                Votre Adresse :
                <input
                  type="text"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                  className="mb-4 px-3 py-2 rounded-md w-full border-solid border-2 border-gray-400"
                />
              </label>
              <label>
                Votre CV :
                <input
                  type="file"
                  name="cv"
                  accept=".pdf" // Specify accepted file types if needed
                  onChange={handleFileChange}
                  className="mb-4 px-3 py-2 rounded-md w-full border-solid border-2 border-gray-400"
                />
              </label>
              <div className="flex justify-around">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 via-red-600 to-purple-700 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpProfilUpdate;
