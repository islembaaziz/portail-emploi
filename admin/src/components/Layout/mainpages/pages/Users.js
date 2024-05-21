import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { API } from '../../../../constant';
import {
  hideLoading,
  showLoading,
} from '../../../../redux/features/alertSlice';
import { toast } from 'react-toastify';
import Spinner from '../../../../components/shared/Spinner';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import FormComponent from '../../../shared/FormComponent';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('update');
  const usersPerPage = 10;
  const [currentUser, setCurrentUser] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    adresse: '',
    role: '',
  });
  const dispatch = useDispatch();

  const fetchUsers = useCallback(async () => {
    try {
      dispatch(showLoading());
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API}/user/get-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
        },
      });
      setUsers(response.data.data);
      setTotalPages(response.data.numOfPage || 1);
    } catch (error) {
      toast.error('Error fetching users data');
    } finally {
      setLoading(false);
      dispatch(hideLoading());
    }
  }, [currentPage, dispatch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUpdate = (user) => {
    setCurrentUser(user);
    setFormMode('update');
    setIsFormOpen(true);
  };

  const handleDelete = async (userId) => {
    try {
      dispatch(showLoading());
      const token = localStorage.getItem('token');
      await axios.delete(`${API}/user/delete-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Error deleting user');
    } finally {
      dispatch(hideLoading());
    }
  };
  const handleCreate = () => {
    setCurrentUser({
      name: '',
      lastName: '',
      email: '',
      password: '',
      adresse: '',
      role: '',
    });
    setFormMode('create');
    setIsFormOpen(true);
  };
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };
  const handleSubmit = async (userData) => {
    try {
      const token = localStorage.getItem('token');

      // Fetch the user's details including role from the server
      const response = await axios.post(
        `${API}/user/getUser`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If the user is Admin, proceed with user creation or update as needed
      if (formMode === 'update') {
        await axios.patch(
          `${API}/user/updateUser/${currentUser._id}`,
          userData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success('User updated successfully');
      } else {
        await axios.post(`${API}/auth/register`, userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('User created successfully');
      }
      setIsFormOpen(false);
      fetchUsers();
    } catch (error) {
      toast.error('Error submitting user data');
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">Utilisateurs</h1>
            <button
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleCreate}
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Créer un nouveau utilisateur
            </button>
          </div>
          {isFormOpen && (
            <FormComponent
              title={
                formMode === 'update'
                  ? 'Mettre à jour ce utilisateur'
                  : 'Créer un nouveau utilisateur'
              }
              fields={[
                { name: 'name', label: 'Nom', type: 'text' },
                { name: 'lastName', label: 'Prénom', type: 'text' },
                {
                  name: 'email',
                  label: 'Email',
                  type: 'email',
                },
                formMode === 'update'
                  ? null // Hide password field when updating user
                  : {
                      name: 'password',
                      label: 'Mot de passe',
                      type: 'password',
                    },
                { name: 'adresse', label: 'Adresse', type: 'text' },
                {
                  name: 'role',
                  label: 'Role',
                  type: 'select',
                  enum: ['Admin', 'RH', 'User'],
                },
              ].filter(Boolean)} // Remove null fields
              initialValues={currentUser}
              onSubmit={handleSubmit}
              onClose={handleCloseForm}
              submitButtonLabel={
                formMode === 'update'
                  ? 'Mettre à jour cette offre'
                  : 'Créer une nouvelle offre'
              }
            />
          )}

          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1 + (currentPage - 1) * usersPerPage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.name} {user.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center space-x-4">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => handleUpdate(user)}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(user._id)}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Précédent
            </button>
            <span>
              Page {currentPage}/{totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Suivante
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
