import React, { useState } from 'react';
// 1. Import your custom instance instead of the raw axios library
import axiosInstance from '../api/axiosInstance'; 
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true); 
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        const endpoint = isLogin ? 'login' : 'register';
        
        // 2. We no longer need to manually construct the URL string here!
        // The instance handles the Base URL (Render or Local) and the "/api" prefix.
        const path = `/user/${endpoint}`;

        try {
            console.log(`Attempting ${endpoint} for:`, formData.email);
            
            // 3. Use axiosInstance.post instead of axios.post
            const response = await axiosInstance.post(path, formData, {
                timeout: 8000 // Increased slightly for cold-starts on Render
            });

            const data = response.data;
            
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userInfo', JSON.stringify(data));
                
                toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
                setTimeout(() => navigate('/Profile'), 1000);
            } else {
                toast.error("Authentication failed: No token received.");
            }

        } catch (err) {
            console.error("Auth Error:", err);

            const errorMessage = err.response?.data?.message?.toLowerCase() || "";

            if (isLogin && (errorMessage.includes("not found") || errorMessage.includes("user does not exist"))) {
                toast.info("Account not found. Switching to Sign Up...");
                setIsLogin(false);
            } else if (!isLogin && errorMessage.includes("already exist")) {
                toast.info("Email already exists. Switching to Login...");
                setIsLogin(true);
            } else if (err.code === 'ECONNABORTED') {
                toast.error("Server is taking too long. Render might be 'waking up'—please try again.");
            } else {
                toast.error(err.response?.data?.message || "Connection error. Check your backend.");
            }
        } finally {
            setLoading(false);
        }
    };

    // ... rest of your return JSX stays exactly the same
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <ToastContainer position="top-right" autoClose={3000} />
            <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-blue-100/50 w-full max-w-md border border-slate-100"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-2xl mb-4">
                        <Sparkles size={28} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">
                        {isLogin ? "Welcome Back" : "Join Us"}
                    </h2>
                    <p className="text-slate-500 text-sm">
                        {isLogin ? "Sign in to your portal" : "Register to start your projects"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <AnimatePresence mode='wait'>
                        {!isLogin && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="relative overflow-hidden"
                            >
                                <User className="absolute left-4 top-4 text-slate-400" size={20} />
                                <input 
                                    type="text" placeholder="Full Name" required={!isLogin}
                                    value={formData.name}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="relative">
                        <Mail className="absolute left-4 top-4 text-slate-400" size={20} />
                        <input 
                            type="email" placeholder="Email Address" required
                            value={formData.email}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" required
                            value={formData.password}
                            className="w-full pl-12 pr-12 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-4 text-slate-400 hover:text-blue-600"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0054A6] hover:bg-blue-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg disabled:bg-slate-300"
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Wait a moment...</span>
                            </div>
                        ) : (
                            <>
                                {isLogin ? "Sign In" : "Sign Up"} 
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button 
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setFormData({ name: '', email: '', password: '' });
                        }}
                        className="text-slate-500 text-sm hover:text-blue-600 transition-colors"
                    >
                        {isLogin ? "New here? " : "Already member? "}
                        <span className="font-bold text-[#0054A6]">
                            {isLogin ? "Create account" : "Login"}
                        </span>
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;