import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL 
        ? `${import.meta.env.VITE_BACKEND_URL}/api` 
        : 'http://localhost:4000/api',
});

// Admin Interceptor
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken'); // Using adminToken specifically
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;