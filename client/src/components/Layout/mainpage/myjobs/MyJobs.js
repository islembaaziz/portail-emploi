import React, { useEffect, useState } from 'react';
import ApplicationCardCard from '../../../shared/ApplicationCard';
import axios from 'axios';
import { API } from '../../../../constant';
import Spinner from '../../../shared/Spinner';

const MyJobs = () => {
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);
  const perPage = 5;

  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API}/apply/get-application`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: currentPage,
            limit: perPage,
          },
        });
        setApplications(response.data.applications);
        setNumOfPages(response.data.numOfPages); // Corrected property name
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applications data:', error);
        setLoading(false);
      }
    };

    fetchMyApplications();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto mt-8 text-center">
      <h1 className="font-bold text-4xl">Mes Candidatures</h1>
      <div className="flex-wrap flex mt-16 justify-center">
        {loading ? (
          <Spinner />
        ) : (
          applications.map((application) => (
            <ApplicationCardCard
              key={application.id}
              applications={application}
            />
          ))
        )}
      </div>
      <div className="flex justify-center mt-8">
        {[...Array(numOfPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page + 1)}
            className={`mx-1 px-3 py-1 border font-bold rounded-md ${
              currentPage === page + 1
                ? 'bg-gradient-to-r from-orange-500 via-red-600 to-purple-700 text-white font-bold rounded-md'
                : ''
            }`}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyJobs;
