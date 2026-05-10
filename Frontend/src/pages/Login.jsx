import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:4000/api/user/login', formData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/profile');
        } catch (err) {
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100">
            <form onSubmit={handleSubmit} className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-slate-800">Welcome Back</h2>
                <input 
                    type="email" placeholder="Email" className="w-full p-3 mb-4 border rounded-lg"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <input 
                    type="password" placeholder="Password" className="w-full p-3 mb-6 border rounded-lg"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button className="w-full bg-sky-600 text-white py-3 rounded-lg font-bold hover:bg-sky-700">
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default Login;