import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  UserCircleIcon,
  CheckCircleIcon,
  ArrowRightStartOnRectangleIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';

const SideBar = ({ onSidebarItemClick, activeComponent }) => {
  const handleItemClick = (componentName) => {
    onSidebarItemClick(componentName);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logout Successfuly');
    navigate('/login');
    window.location.reload();
  };
  return (
    <aside
      id="default-sidebar"
      className="fixed top-auto mt-4 left-0 z-40 border-2 border-gray-300 border-dashed rounded-lg w-64  transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className=" px-3 py-4 overflow-y-auto bg-gray-50">
        <div className="flex items-center p-2 mb-4 bg-gray-200 text-teal-600 text-xl rounded-lg">
          <ChartPieIcon className="h-5 w-5" />
          <span className="ms-3 font-semibold">Dashboard</span>
        </div>
        <ul className="space-y-2  font-medium">
          <li>
            <button
              className={`flex items-center p-2 w-full text-gray-900 rounded-lg hover:bg-gray-100 group ${
                activeComponent === 'Profile' ? 'bg-blue-200' : ''
              }`}
              onClick={() => handleItemClick('Profile')}
            >
              <UserCircleIcon className="h-5 w-5" />
              <span className="flex ms-3 whitespace-nowrap">Profile</span>
            </button>
          </li>
          <li>
            <button
              className={`flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                activeComponent === 'MyJobs' ? 'bg-blue-200' : ''
              }`}
              onClick={() => handleItemClick('MyJobs')}
            >
              <CheckCircleIcon className="h-5 w-5" />
              <span className="flex ms-3 whitespace-nowrap">
                Mes candidatures
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className={`flex w-full items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                activeComponent === 'Logout' ? 'bg-blue-200' : ''
              }`}
            >
              <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
              <span className="flex ms-3 whitespace-nowrap">
                Se déconnecter
              </span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
