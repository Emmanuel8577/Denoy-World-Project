import React from 'react';
import { Users, LayoutGrid, MessageSquare } from 'lucide-react';

const Sidebar = ({ setView, activeView }) => {
    return (
        <div className="w-64 h-screen bg-slate-900 text-white p-6 fixed flex flex-col">
            <h1 className="text-xl font-bold text-sky-400 mb-10">Denyo Terminal</h1>
            
            <nav className="flex flex-col gap-2">
                <button 
                    onClick={() => setView('projects')} 
                    className={`flex items-center gap-3 p-3 rounded-xl transition ${activeView === 'projects' ? 'bg-sky-500/20 text-sky-400' : 'hover:bg-slate-800'}`}
                >
                    <LayoutGrid size={18} /> Projects
                </button>

                {/* NEW USERS SECTION */}
                <button 
                    onClick={() => setView('users')} 
                    className={`flex items-center gap-3 p-3 rounded-xl transition ${activeView === 'users' ? 'bg-sky-500/20 text-sky-400' : 'hover:bg-slate-800'}`}
                >
                    <Users size={18} /> Users
                </button>

                <button 
                    onClick={() => setView('messages')} 
                    className={`flex items-center gap-3 p-3 rounded-xl transition ${activeView === 'messages' ? 'bg-sky-500/20 text-sky-400' : 'hover:bg-slate-800'}`}
                >
                    <MessageSquare size={18} /> Messages
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;