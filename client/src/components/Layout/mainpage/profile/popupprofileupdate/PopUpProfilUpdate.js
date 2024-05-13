import React, { useState } from 'react';
import axios from 'axios';
import { API } from '../../../../../constant'; 

const PopUpProfilUpdate = ({ setPopupOpen }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    adresse: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.put(`${API}/user/update-user`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          // Handle success, maybe show a success message
        } else {
          console.error('Error updating user profile:', response.data.message);
        }
      } else {
        console.error('Token not found in localStorage');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div
     
      className="fixed bg-black bg-opacity-50 inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
    >
      <div className="relative  w-auto max-w-md p-5 mx-auto my-6">
        {/*content*/}
        <div className="relative bg-white rounded-lg shadow-lg outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
            <h3 className="text-3xl font-semibold">Modifier votre profil</h3>
          </div>
          {/*body*/}
          <div className="relative flex-auto p-6">
            {/* Your form elements go here */}
            <form onSubmit={handleSubmit}>
              <label>
                {' '}
                Votre Nom :
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mb-4 rounded-md w-full border-solid border-2  border-gray-400 "
                />
              </label>
              <label>
                {' '}
                Votre Prénom :
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mb-4 rounded-md w-full border-solid border-2  border-gray-400 "
                />
              </label>
              <label>
                {' '}
                Votre Email :
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mb-4 rounded-md w-full border-solid border-2  border-gray-400 "
                />
              </label>
              <label>
                {' '}
                Votre Adresse :
                <input
                  type="text"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                  className="mb-4 rounded-md w-full border-solid border-2  border-gray-400 "
                />
              </label>
              <button
                type="submit"
                className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              >
                Sauvegarder
              </button>
            </form>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setPopupOpen(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpProfilUpdate;
