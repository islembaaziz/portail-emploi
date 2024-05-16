import React, { useEffect, useState } from 'react';
import ApplicationCardCard from '../../../shared/ApplicationCard';
import axios from 'axios';
import { API } from '../../../../constant';
import Spinner from '../../../shared/Spinner';

const MyJobs = () => {
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API}/apply/get-application`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApplications(response.data.applications);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applications data:', error);
        setLoading(false);
      }
    };

    fetchMyApplications(); // Call the fetch function here
  }, []); // Add an empty dependency array
  console.log(applications);

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
    </div>
  );
};

export default MyJobs;
