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
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import FormComponent from '../../../shared/FormComponent';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('update');
  const [currentApplication, setCurrentApplication] = useState({
    _id: '',
    jobId: {
      _id: '',
      company: '',
      position: '',
      workType: '',
      workLocation: '',
      description: '',
      date: '',
    },
    status: '',
    createdBy: {
      _id: '',
      name: '',
      lastName: '',
      email: '',
      adresse: '',
      role: '',
    },
  });
  const applicationsPerPage = 10;

  const dispatch = useDispatch();
  const fetchApplications = useCallback(async () => {
    try {
      dispatch(showLoading());
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API}/apply/get-application`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
        },
      });
      setApplications(response.data.applications);
      setTotalPages(response.data.numOfPages);
      setLoading(false);
      dispatch(hideLoading());
    } catch (error) {
      toast.error('Error fetching applications data');
      setLoading(false);
      dispatch(hideLoading());
    }
  }, [currentPage, dispatch]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);
  console.log(applications)
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API}/apply/delete-application/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Application deleted successfully');
      fetchApplications();
    } catch (error) {
      toast.error('Error deleting application');
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleUpdate = (application) => {
    setCurrentApplication(application);
    setFormMode('update');
    setIsFormOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${API}/apply/update-application/${currentApplication._id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Application updated successfully');
      fetchApplications();
      setIsFormOpen(false);
    } catch (error) {
      toast.error('Error submitting application');
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">Candidatures</h1>
          </div>
          {isFormOpen && (
            <FormComponent
              title="Mettre à jour cette offre"
              fields={[
                {
                  name: 'status',
                  label: 'statut du candidature',
                  type: 'select',
                  enum: [
                    'en attente',
                    'rejeter',
                    'entretien',
                  ],
                },
              
              ]}
              initialValues={currentApplication}
              onSubmit={handleSubmit}
              onClose={handleCloseForm}
              submitButtonLabel="Mettre à jour cette offre"
            />
          )}

          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ENTREPRISE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  POSTE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.map((application, index) => (
                <tr key={application._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1 + (currentPage - 1) * applicationsPerPage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {application.jobId.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {application.jobId.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {application.createdBy.name}{' '}
                    {application.createdBy.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {application.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center space-x-4">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => handleUpdate(application)}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(application._id)}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage}/{totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Applications;
