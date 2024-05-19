import React from 'react'
import Users from './pages/Users'
import Jobs from './pages/Jobs'
import Roles from './pages/Roles'
import Applications from './pages/Applications'

const MainPage = ({ activeComponent }) => {
  return (
    <div className="p-4 sm:ml-64">
    <div className="p-4 border-2 h-auto border-gray-300 border-dashed rounded-lg">
      {activeComponent === 'Utilisateurs' && <Users />}
      {activeComponent === 'Offres' && <Jobs />}
      {activeComponent === 'Roles' && <Roles />}
      {activeComponent === 'Applications' && <Applications />}
    </div>
  </div>
  )
}

export default MainPage