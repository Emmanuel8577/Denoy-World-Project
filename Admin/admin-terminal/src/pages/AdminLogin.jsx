import React, { useState } from 'react';
// 1. Import your admin axios instance
import axiosInstance from '../api/axiosInstance'; 
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // 2. Use the instance and a relative path
            const { data } = await axiosInstance.post('/user/login', { email, password });
            
            if (data.role === 'admin') {
                localStorage.setItem('adminToken', data.token);
                // 3. Using navigate is cleaner than window.location.href 
                // but window.location.href works if you want a full state reset
                navigate('/'); 
            } else {
                alert("Access Denied: You do not have Administrative privileges.");
            }
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || "Login Failed: Please check your credentials.";
            alert(msg);
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