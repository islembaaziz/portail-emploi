import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API } from '../../../../constant';
import { useDispatch } from 'react-redux';
import {
  hideLoading,
  showLoading,
} from '../../../../redux/features/alertSlice';
import Spinner from '../../../../components/shared/Spinner';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import FormComponent from '../../../../components/shared/FormComponent';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const jobsPerPage = 10;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [currentJob, setCurrentJob] = useState({
    company: '',
    position: '',
    workType: '',
    workLocation: '',
    description: '',
  });

  const dispatch = useDispatch();

  const fetchJobs = useCallback(async () => {
    try {
      dispatch(showLoading());
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API}/job/get-job`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
        },
      });
      setJobs(response.data.jobs);
      setTotalPages(response.data.numOfPage);
      setLoading(false);
      dispatch(hideLoading());
    } catch (error) {
      toast.error('Error fetching jobs data');
      setLoading(false);
      dispatch(hideLoading());
    }
  }, [currentPage, dispatch]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API}/job/delete-job/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Job deleted successfully');
      fetchJobs();
    } catch (error) {
      toast.error('Error deleting job');
    }
  };

  const handleUpdate = (job) => {
    setCurrentJob(job);
    setFormMode('update');
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setCurrentJob({
      company: '',
      position: '',
      workType: '',
      workLocation: '',
      description: '',
    });
    setFormMode('create');
    setIsFormOpen(true);
  };

  const handleSubmit = async (jobData) => {
    try {
      const token = localStorage.getItem('token');
      if (formMode === 'update') {
        await axios.patch(`${API}/job/update-job/${currentJob._id}`, jobData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Job updated successfully');
      } else {
        await axios.post(`${API}/job/create-job`, jobData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Job created successfully');
      }
      setIsFormOpen(false);
      fetchJobs();
    } catch (error) {
      toast.error('Error submitting job data');
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">Offres d'emploi</h1>
            <button
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleCreate}
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Créer une nouvelle offre d'emploi
            </button>
          </div>

          {isFormOpen && (
            <FormComponent
              title={formMode === 'update' ? 'Mettre à jour cette offre' : 'Créer une nouvelle offre'}
              fields={[
                { name: 'company', label: 'Entreprise', type: 'text' },
                { name: 'position', label: 'Position', type: 'text' },
                { name: 'workLocation', label: 'Lieu de travail', type: 'text' },
                { name: 'workType', label: 'Type de travail', type: 'select', enum: ['temps-plein', 'temps-partiel', 'stage', 'contaract', 'emplois-distance', 'emplois-saisonnier'] },
                { name: 'description', label: 'Description', type: 'text' },
              ]}
              initialValues={currentJob}
              onSubmit={handleSubmit}
              onClose={handleCloseForm}
              submitButtonLabel={
                formMode === 'update' ? 'Mettre à jour cette offre' : 'Créer une nouvelle offre'
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
                ENTREPRISE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {jobs.map((job, index) => (
                <tr key={job._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1 + (currentPage - 1) * jobsPerPage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {job.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center space-x-4">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => handleUpdate(job)}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(job._id)}
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

export default Jobs;
