import React, { useState, useEffect } from 'react';
import {
  MapPinIcon,
  DocumentIcon,
  ChevronRightIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';
import { API } from '../../constant';

const Card = ({ job }) => {
  const [hasApplied, setHasApplied] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Check if the user has already applied to this job
    const checkApplicationStatus = async () => {
      try {
        const response = await axios.get(`${API}/apply/application-status`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          params: { jobId: job._id },
        });

        setHasApplied(response.data.hasApplied);
      } catch (error) {
        console.error('There was a problem checking the application status:', error);
      }
    };

    checkApplicationStatus();
  }, [job._id, token]);

  const apply = async () => {
    try {
      const response = await axios.post(
        `${API}/apply/create-application`,
        { jobId: job._id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Application successful:', response.data);
      setHasApplied(true); // Update state to disable button
    } catch (error) {
      console.error('There was a problem with the application:', error);
    }
  };

  return (
    <div
      key={job._id}
      className="bg-zinc-100 hover:bg-slate-100 shadow-md rounded-lg p-6 m-4 w-full flex flex-col"
    >
      <div className="flex items-center mb-2">
        <BuildingLibraryIcon className="h-6 w-6" aria-hidden="true" />
        <p className="bg-gradient-to-r from-orange-500 via-red-600 to-purple-700 text-xl text-transparent bg-clip-text font-bold">
          {job.company}
        </p>
      </div>
      <div className="flex items-center mb-2">
        <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
        <h2 className="text-xl font-semibold">{job.position}</h2>
      </div>
      <div className="mb-4">
        <p className="text-gray-700 font-semibold mb-1">Description :</p>
        <p className="text-gray-700 flex-grow">{job.description}</p>
      </div>
      <div className="flex justify-between mb-4">
        <div className="flex justify-between items-center gap-2">
          <MapPinIcon className="h-6 w-6" aria-hidden="true" />
          <p className="text-gray-700 font-semibold">Location /</p>
          <p className="text-gray-500">{job.workLocation}</p>
        </div>
        <div className="flex justify-between items-center gap-2">
          <DocumentIcon className="h-6 w-6" aria-hidden="true" />
          <p className="text-gray-700 font-semibold">Type /</p>
          <p className="text-gray-500">{job.workType}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={apply}
          disabled={hasApplied}
          className={`bg-black text-white w-1/3 font-bold rounded-xl p-2 ${hasApplied ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {hasApplied ? 'Déjà appliqué' : 'Postuler'}
        </button>
      </div>
    </div>
  );
};

export default Card;
