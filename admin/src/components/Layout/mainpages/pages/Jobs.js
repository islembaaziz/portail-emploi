import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { API} from '../../../../constant'
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchJobs();
  }, [currentPage]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
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
    } catch (error) {
      toast.error('Error fetching jobs data');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API}/job/${id}`, {
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

  const handleUpdate = (id) => {
    // Implement the update logic here
    toast.info('Update functionality to be implemented');
  };

  const handleCreate = () => {
    // Implement the create logic here
    toast.info('Create functionality to be implemented');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Jobs</h1>
        <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleCreate}
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create New Job
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Company</th>
              <th className="py-2">Position</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td className="py-2">{job.company}</td>
                <td className="py-2">{job.position}</td>
                <td className="py-2">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleUpdate(job._id)}
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(job._id)}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex justify-between mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Jobs