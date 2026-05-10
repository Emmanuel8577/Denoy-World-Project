import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AdminDashboard from './AdminDashboard';
import UserManagement from './UserManagement';

const AdminParent = () => {
  // This state determines which component is visible
  const [view, setView] = useState('projects'); 

  return (
    <div className="flex">
      {/* Pass setView to the sidebar so it can change the page */}
      <Sidebar setView={setView} activeView={view} />
      
      <div className="ml-64 flex-1">
        {view === 'projects' && <AdminDashboard />}
        {view === 'users' && <UserManagement />}
        {view === 'messages' && (
          <div className="p-10 text-slate-500">Messages Coming Soon...</div>
        )}
      </div>
    </div>
  );
};

export default AdminParent;