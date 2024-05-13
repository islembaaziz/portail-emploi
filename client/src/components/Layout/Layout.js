import React, { useState } from 'react';
import SideBar from './sidebar/SideBar';
import MainPage from './mainpage/MainPage';

const Layout = () => {
  const [activeComponent, setActiveComponent] = useState('Profile');

  const handleSidebarItemClick = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div className="flex">
      <SideBar onSidebarItemClick={handleSidebarItemClick} activeComponent={activeComponent} />
      <MainPage activeComponent={activeComponent} />
    </div>
  );
};

export default Layout;
