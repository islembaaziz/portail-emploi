import React, { useEffect, useState } from 'react';
import Card from './shared/Card';
import axios from 'axios';
import { API } from '../constant';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchJobs();
    }, 300); // debounce time in milliseconds

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, currentPage]);

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
          search: searchQuery,
        },
      });
      console.log('data', response.data);
      setJobs(response.data.jobs);
      setTotalPages(response.data.numOfPage);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs data:', error);
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  return (
    <div name="offres" className="container mx-auto mt-16 text-center">
     
      <div className="flex-wrap flex mt-16 justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          jobs.map((job) => <Card key={job._id} job={job} />)
        )}
      </div>
      <div className="flex justify-center mt-4">
        {/* Pagination component */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`pagination-btn ${
              currentPage === page
                ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold'
                : 'bg-white text-pink-500 font-bold'
            } px-4 py-2 rounded-md border border-gray-300 mx-1 focus:outline-none focus:border-blue-300 focus:shadow-outline`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobsList;
