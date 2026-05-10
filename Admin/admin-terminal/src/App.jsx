import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AdminDashboard from './pages/AdminDashboard';
import Users from './pages/Users'; // This will point to your new UserManagement logic
import Messages from './pages/Messages';
import AdminLogin from './pages/AdminLogin';

function App() {
  // Use 'projects' as the default view
  const [view, setView] = useState('projects');
  const token = localStorage.getItem('adminToken');

  // 1. Authentication Guard
  if (!token) {
    return (
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        {/* Redirect any other path to login if not authenticated */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  // 2. Authenticated Layout
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar sits at the top of the viewport */}
      <Navbar /> 
      
      <div className="flex">
        {/* 
          Sidebar is fixed (width 64). 
          We pass 'view' to highlight the active button 
          and 'setView' to change what the main area displays.
        */}
        <Sidebar setView={setView} activeView={view} />
        
        {/* 
          Main content area with a left margin of 64 
          to prevent the fixed sidebar from overlapping it.
        */}
        <main className="ml-64 flex-1 p-8">
          {view === 'projects' && <AdminDashboard />}
          
          {/* This renders the new section where Admin can view all users and their files */}
          {view === 'users' && <Users />}
          
          {view === 'messages' && <Messages />}
        </main>
      </div>
    </div>
  );
}

export default App;