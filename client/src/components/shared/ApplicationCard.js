import React from 'react';
import {
  MapPinIcon,
  DocumentIcon,
  ChevronRightIcon,
  BuildingLibraryIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

const ApplicationCard = ({ applications, onDelete }) => {
  // Function to determine the background color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'en attente':
        return 'bg-gray-500';
      case 'entretien':
        return 'bg-green-500';
      case 'rejeter':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div
      key={applications._id}
      className={"relative hover:bg-slate-100 shadow-md rounded-lg p-6 m-4 w-full flex flex-col "}
    >
      {/* TrashIcon */}
      <TrashIcon onClick={() => onDelete(applications._id)} className="absolute top-2 right-2 h-6 w-6 text-red-500 cursor-pointer" />

      <div className="flex items-center mb-2">
        <BuildingLibraryIcon className="h-6 w-6" aria-hidden="true" />
        <p className="bg-gradient-to-r from-orange-500 via-red-600 to-purple-700 text-xl text-transparent bg-clip-text font-bold">
          {applications.jobId.company}
        </p>
      </div>
      <div className="flex items-center mb-2">
        <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
        <h2 className="text-xl font-semibold ">{applications.jobId.position}</h2>
      </div>
      <div className="mb-4 text-left">
        <p className="text-gray-700 font-semibold mb-1">Description :</p>
        <p className="text-gray-700 flex-grow">{applications.jobId.description}</p>
      </div>
      <div className="flex justify-between mb-4">
        <div className="flex justify-between items-center gap-2">
          <MapPinIcon className="h-6 w-6" aria-hidden="true" />
          <p className="text-gray-700 font-semibold">Location /</p>
          <p className="text-gray-500">{applications.jobId.workLocation} </p>
        </div>
        <div className="flex justify-between items-center gap-2">
          <DocumentIcon className="h-6 w-6" aria-hidden="true" />
          <p className="text-gray-700 font-semibold ">Type /</p>
          <p className="text-gray-500">{applications.jobId.workType} </p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className={`text-white w-1/3 uppercase font-bold rounded-xl p-2 ${getStatusColor(
          applications.status
        )}`}>
          {applications.status}
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
