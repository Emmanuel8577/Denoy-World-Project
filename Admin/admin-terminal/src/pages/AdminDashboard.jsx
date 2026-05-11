import React, { useEffect, useState } from "react";
// 1. Import your existing axios instance
import axiosInstance from "../api/axiosInstance"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  FileVideo, FileAudio, FileImage, FileText,
  Send, Eye, CheckCircle, FileUp, XCircle, Info
} from "lucide-react";

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [uploadingId, setUploadingId] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({});

  const fetchProjects = async () => {
    try {
      // 2. The instance handles the Base URL and the /api prefix
      // We just need to add the /admin path
      const { data } = await axiosInstance.get("/admin/all-projects");
      setProjects(Array.isArray(data) ? data : data.projects || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to load terminal data");
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleFileSelect = (projectId, file) => {
    if (!file) return;
    setSelectedFiles(prev => ({ ...prev, [projectId]: file }));
    toast.info("File staged for delivery");
  };

  const handleResendFile = async (projectId) => {
    const file = selectedFiles[projectId];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("projectId", projectId);

    setUploadingId(projectId);
    const toastId = toast.loading("Uploading to secure server...");

    try {
      // 3. Post using the admin route
      const { data } = await axiosInstance.post("/admin/upload-completed", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (data.success) {
        toast.update(toastId, { 
            render: "Work delivered to client! 🚀", 
            type: "success", 
            isLoading: false, 
            autoClose: 3000 
        });
        
        setSelectedFiles(prev => { const n = {...prev}; delete n[projectId]; return n; });
        fetchProjects();
      }
    } catch (err) {
      toast.update(toastId, { 
          render: err.response?.data?.message || "Delivery failed", 
          type: "error", 
          isLoading: false, 
          autoClose: 3000 
      });
    } finally {
      setUploadingId(null);
    }
  };

  const getIcon = (type) => {
    const p = { size: 24, className: "mb-1" };
    if (type === "video") return <FileVideo {...p} className="text-purple-500" />;
    if (type === "audio") return <FileAudio {...p} className="text-pink-500" />;
    if (type === "image") return <FileImage {...p} className="text-orange-500" />;
    return <FileText {...p} className="text-blue-500" />;
  };

  return (
    <div className="p-6 md:p-10 space-y-8 bg-slate-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Admin Terminal</h2>
          <p className="text-slate-500 font-medium">Finalizing and delivering projects</p>
        </div>
      </header>

      <div className="grid gap-6">
        {projects.map((p) => (
          <div key={p._id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 flex flex-col md:flex-row justify-between gap-6">
              <div className="flex gap-5">
                <div className="h-16 w-16 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-100 shrink-0">
                  {getIcon(p.fileType)}
                  <span className="text-[10px] font-black uppercase text-slate-400">{p.fileType}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{p.title || "Project"}</h3>
                  <p className="text-slate-500 text-sm mt-1 font-medium">
                    Client: <span className="text-slate-900">{p.userId?.name || "User"}</span>
                  </p>
                  
                  <div className="mt-3 flex items-center gap-3">
                    <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider ${p.status === 'completed' ? 'bg-green-100 text-green-600 border border-green-200' : 'bg-amber-100 text-amber-600 border border-amber-200'}`}>
                      {p.status}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">REF: {p._id.slice(-6).toUpperCase()}</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => window.open(p.originalFileUrl, "_blank")} 
                className="h-fit bg-slate-900 text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200"
              >
                <Eye size={16} /> Preview Source
              </button>
            </div>

            <div className="px-6 pb-6">
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2 text-blue-700">
                  <Info size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Client Instructions</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  {p.description ? `"${p.description}"` : "No specific instructions provided by the client."}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 px-6 border-t border-slate-100">
              {!selectedFiles[p._id] ? (
                <div className="flex items-center gap-4">
                  <label className="flex-1">
                    <div className="flex items-center justify-center gap-3 py-3 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-white transition-all bg-white/50 group">
                      <FileUp size={18} className="text-slate-400 group-hover:text-blue-500" />
                      <span className="text-sm font-bold text-slate-500 group-hover:text-blue-600">Click to upload completed work</span>
                      <input type="file" className="hidden" onChange={(e) => handleFileSelect(p._id, e.target.files[0])} />
                    </div>
                  </label>
                  {p.status === "completed" && (
                    <div className="flex items-center gap-1.5 text-green-600 font-black text-[10px] uppercase bg-white px-3 py-3 rounded-xl border border-green-100">
                      <CheckCircle size={14} /> Delivered
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex-1 bg-white border border-blue-200 p-3 rounded-2xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3 overflow-hidden">
                       <div className="p-2 bg-blue-50 rounded-lg text-blue-600 shrink-0">
                         <FileText size={18} />
                       </div>
                       <span className="text-sm font-bold text-slate-700 truncate">{selectedFiles[p._id].name}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedFiles(prev => {const n={...prev}; delete n[p._id]; return n;})}
                      className="p-1 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors text-slate-300"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                  <button 
                    disabled={uploadingId === p._id}
                    onClick={() => handleResendFile(p._id)}
                    className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:bg-slate-300"
                  >
                    <Send size={16} /> {uploadingId === p._id ? "SENDING..." : "DELIVER"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {projects.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold">No projects found in the database.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;