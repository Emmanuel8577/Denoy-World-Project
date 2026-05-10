import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileVideo, FileAudio, FileImage, FileText, Send, Eye, CheckCircle, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [uploadingId, setUploadingId] = useState(null);

    const fetchProjects = async () => {
        try {
            const token = localStorage.getItem('adminToken'); // Ensure this matches your login key
            const { data } = await axios.get('http://localhost:4000/api/admin/all-projects', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProjects(data.projects || []);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // FIX FOR PDF/DOCUMENT VIEWING
    const handleViewAsset = (url) => {
        if (!url) return alert("No file URL found");
        
        // Force HTTPS and clean the URL
        const secureUrl = url.replace("http://", "https://");
        
        // Open in new tab with specific security attributes to bypass frame errors
        const newWindow = window.open(secureUrl, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    };

    // FIX FOR RESEND FILE (500 Error fix)
    const handleResendFile = async (projectId, file) => {
        if (!file) return;
        
        const token = localStorage.getItem('adminToken');
        const formData = new FormData();
        formData.append('file', file);
        formData.append('projectId', projectId);

        try {
            setUploadingId(projectId);
            const { data } = await axios.post(
                'http://localhost:4000/api/admin/upload-completed', 
                formData,
                { 
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data' 
                    } 
                }
            );

            if (data.success) {
                alert("Project delivered successfully!");
                fetchProjects(); // Refresh UI
            }
        } catch (err) {
            alert(err.response?.data?.message || "Upload failed. Check server console.");
        } finally {
            setUploadingId(null);
        }
    };

    const getIcon = (type) => {
        switch(type) {
            case 'video': return <FileVideo className="text-purple-500" />;
            case 'audio': return <FileAudio className="text-pink-500" />;
            case 'image': return <FileImage className="text-orange-500" />;
            default: return <FileText className="text-blue-500" />;
        }
    };

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Project Delivery Terminal</h2>
            <div className="grid gap-6">
                {projects.map(p => (
                    <div key={p._id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex gap-4">
                                <div className="h-14 w-14 bg-slate-100 rounded-2xl flex items-center justify-center">
                                    {getIcon(p.fileType)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900">{p.title}</h3>
                                    <p className="text-slate-500 text-sm">Client: <span className="font-medium text-slate-700">{p.userId?.name}</span></p>
                                    <div className="flex gap-2 mt-2">
                                        <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${p.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {p.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => handleViewAsset(p.originalFileUrl)}
                                className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:scale-105 transition-all"
                            >
                                <Eye size={16} /> View Client File
                            </button>
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-100">
                            <p className="text-xs font-bold text-slate-400 uppercase mb-3">Upload Final Result</p>
                            <div className="flex items-center gap-4">
                                <label className="flex-1 group">
                                    <div className="flex items-center justify-center w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer group-hover:border-blue-400 group-hover:bg-blue-50 transition-all">
                                        <div className="flex items-center gap-2 text-slate-500 group-hover:text-blue-600">
                                            {uploadingId === p._id ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                                            <span className="text-sm font-semibold">
                                                {uploadingId === p._id ? "Uploading..." : "Select & Send Final File"}
                                            </span>
                                        </div>
                                        <input 
                                            type="file" 
                                            className="hidden" 
                                            onChange={(e) => handleResendFile(p._id, e.target.files[0])}
                                            disabled={uploadingId === p._id}
                                        />
                                    </div>
                                </label>
                                {p.status === 'completed' && (
                                    <button 
                                        onClick={() => handleViewAsset(p.translatedFileUrl)}
                                        className="text-blue-600 font-bold text-sm hover:underline"
                                    >
                                        View Sent File
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;