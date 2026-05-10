import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import AdminDashboard from '../pages/AdminDashboard';
import Messages from '../pages/Messages';

const AdminLayout = () => {
    const [view, setView] = useState('projects');

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar setView={setView} activeView={view} />
            <main className="ml-64 flex-1 p-8">
                {view === 'projects' ? <AdminDashboard /> : <Messages />}
            </main>
        </div>
    );
};

export default AdminLayout;