import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { API } from '../../../../constant';
import {
  hideLoading,
  showLoading,
} from '../../../../redux/features/alertSlice';
import { toast } from 'react-toastify';
import Spinner from '../../../../components/shared/Spinner';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchRoles = async () => {
    try {
      dispatch(showLoading());
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API}/role/get-role`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRoles(response.data.roles);
    } catch (error) {
      toast.error('Error fetching roles data');
    } finally {
      setLoading(false);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">Roles</h1>
          </div>
          <table className="min-w-full  bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ROLE
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {roles.map((role, index) => (
                <tr key={role._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {role.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Roles;
