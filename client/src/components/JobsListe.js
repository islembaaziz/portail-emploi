import React from 'react';
import Card from './shared/Card';
import JobData from './JobData';

const JobsList = () => {
  return (
    <div name="offres" className="container mx-auto mt-16 text-center">
      <h1 className="font-bold text-4xl">Nos derniers offres d'emploi</h1>
      <div className="flex-wrap flex mt-16 justify-center">
        {JobData.map((job) => (
          <Card key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobsList;
