import React, { useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import MainPage from './mainpages/MainPage';

const Layout = () => {
  const [activeComponent, setActiveComponent] = useState('Utilisateurs');
  const handleSidebarItemClick = (componentName) => {
    setActiveComponent(componentName);
  };
  return (
    <div>
      <Sidebar onSidebarItemClick={handleSidebarItemClick} activeComponent={activeComponent} />
      <MainPage activeComponent={activeComponent} />
    </div>
  );
};

export default Layout;
