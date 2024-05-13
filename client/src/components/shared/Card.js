import React from 'react';

const Card = ({ job }) => {
    
    return (
        <div className="bg-zinc-100 hover:bg-white shadow-md rounded-lg p-6 m-4 w-80 flex flex-col">
            <h2 className="text-xl font-semibold mb-2">{job.position}</h2>
            <p className="text-gray-600 mb-2">{job.company}</p>
            <div className="mb-4">
                <p className="text-gray-700 font-semibold mb-1">Description :</p>
                <p className="text-gray-700 flex-grow">{job.description}</p>
            </div>
            <div className="flex justify-between mb-4">
                <div>
                    <p className="text-gray-700 font-semibold mb-1">Location :</p>
                    <p className="text-gray-500">{job.workLocation}</p>
                </div>
                <div>
                    <p className="text-gray-700 font-semibold mb-1">Type :</p>
                    <p className="text-gray-500">{job.workType}</p>
                </div>
            </div>
            <button className='w-full bg-black text-white font-bold rounded-xl p-2'>Apply</button>
        </div>
    );
};

export default Card;
