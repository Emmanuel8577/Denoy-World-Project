import React from 'react';
import { LogOut, User, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/');
    };

    return (
        <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="flex items-center gap-2 text-slate-800">
                <ShieldCheck className="text-sky-600" />
                <span className="font-bold text-lg">Denyo Terminal</span>
            </div>
            
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <User size={18} />
                    <span>Admin: Emmanuel</span>
                </div>
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors text-sm font-bold"
                >
                    <LogOut size={18} /> Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;