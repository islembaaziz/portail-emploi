import React from 'react'
import Card from '../../../shared/Card';
import JobData from '../../../JobData'

const MyJobs = () => {
  const firstThreeJobs = JobData.slice(0, 3);
  return (
    <div  className="container mx-auto mt-8 text-center">
      <h1 className="font-bold text-4xl">Mes Candidatures</h1>
      <div className="flex-wrap flex mt-16 justify-center">
      {firstThreeJobs.map((job) => (
          <Card key={job.id} job={job} />
        ))}
      </div>
    </div>
  )
}

export default MyJobs