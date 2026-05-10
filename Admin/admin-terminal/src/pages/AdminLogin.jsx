import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Adjust the URL to your specific backend port (e.g., 4000)
            const { data } = await axios.post('http://localhost:4000/api/user/login', { email, password });
            
            if (data.role === 'admin') {
                localStorage.setItem('adminToken', data.token);
                // Force a reload or navigate to the dashboard
                window.location.href = '/'; 
            } else {
                alert("Access Denied: You do not have Administrative privileges.");
            }
        } catch (err) {
            console.error(err);
            alert("Login Failed: Please check your credentials.");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-slate-900 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-sky-100 p-3 rounded-full mb-3">
                        <ShieldCheck className="text-sky-600" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800">Admin Terminal</h1>
                    <p className="text-slate-500 text-sm">Denyo World Management</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input 
                                type="email" 
                                required
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                                placeholder="admin@denyoworld.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input 
                                type="password" 
                                required
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                                placeholder="••••••••"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-slate-800 text-white py-3 rounded-lg font-bold hover:bg-black transition-all flex justify-center items-center gap-2"
                    >
                        Sign In to Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;