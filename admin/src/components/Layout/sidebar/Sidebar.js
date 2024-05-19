import React from 'react';
import {
  UserCircleIcon,
  BriefcaseIcon,
  ShieldCheckIcon,
  ClipboardDocumentListIcon,
  ChartPieIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onSidebarItemClick, activeComponent }) => {
  const navigate = useNavigate();

  const handleItemClick = (componentName) => {
    onSidebarItemClick(componentName);
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logout Successfully');
    navigate('/login');

  };
  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 border-2 border-gray-300 border-dashed rounded-lg w-64 h-full transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="px-3 py-4 overflow-y-auto bg-gray-50 h-full">
        <div className="flex items-center p-2 mb-4 bg-gray-200 text-teal-600 text-xl rounded-lg">
          <ChartPieIcon className="h-5 w-5" />
          <span className="ms-3 font-semibold">Admin Dashboard</span>
        </div>
        <ul className="space-y-2 font-medium">
          <li>
            <button
              className={`flex items-center p-2 w-full text-gray-900 rounded-lg hover:bg-gray-100 group ${
                activeComponent === 'Utilisateurs' ? 'bg-blue-200' : ''
              }`}
              onClick={() => handleItemClick('Utilisateurs')}
            >
              <UserCircleIcon className="h-5 w-5" />
              <span className="flex ms-3 whitespace-nowrap">Users</span>
            </button>
          </li>
          <li>
            <button
              className={`flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                activeComponent === 'Jobs' ? 'bg-blue-200' : ''
              }`}
              onClick={() => handleItemClick('Offres')}
            >
              <BriefcaseIcon className="h-5 w-5" />
              <span className="flex ms-3 whitespace-nowrap">Jobs</span>
            </button>
          </li>
          <li>
            <button
              className={`flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                activeComponent === 'Roles' ? 'bg-blue-200' : ''
              }`}
              onClick={() => handleItemClick('Roles')}
            >
              <ShieldCheckIcon className="h-5 w-5" />
              <span className="flex ms-3 whitespace-nowrap">Roles</span>
            </button>
          </li>
          <li>
            <button
              className={`flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                activeComponent === 'Applications' ? 'bg-blue-200' : ''
              }`}
              onClick={() => handleItemClick('Applications')}
            >
              <ClipboardDocumentListIcon className="h-5 w-5" />
              <span className="flex ms-3 whitespace-nowrap">Candidatures</span>
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
              <span className="flex ms-3 whitespace-nowrap">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
