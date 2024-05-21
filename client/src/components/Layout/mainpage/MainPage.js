import React from 'react';
import Profile from './profile/Profile';
import MyJobs from './myjobs/MyJobs';

const MainPage = ({ activeComponent }) => {
  return (
    <div className="p-4 w-full sm:ml-64">
      <div className="p-4 border-2 h-auto border-gray-300 border-dashed rounded-lg">
        {activeComponent === 'Profile' && <Profile />}
        {activeComponent === 'MyJobs' && <MyJobs />}
      </div>
    </div>
  );
};

export default MainPage;
