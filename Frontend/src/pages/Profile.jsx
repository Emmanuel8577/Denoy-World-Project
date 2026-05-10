import React, { useState, useEffect } from "react";
// 1. Switch to your custom instance
import axiosInstance from "../api/axiosInstance"; 
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Upload, FileText, Eye, Download, Clock, Inbox, FolderOpen, 
  LogOut, Bell, Settings, Home, ChevronRight
} from "lucide-react";

const UserProfile = () => {
  const [file, setFile] = useState(null);
  const [projectType, setProjectType] = useState("document");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const [myProjects, setMyProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("submit");

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  // Fetch Projects Logic
  const fetchMyProjects = async () => {
    try {
      // 2. No need for full URL or manual headers anymore!
      const { data } = await axiosInstance.get("/projects/user-projects");
      if (data.success) {
        setMyProjects(data.projects);
      }
    } catch (err) {
      console.error("Fetch failed", err);
      // If unauthorized, redirect to login
      if (err.response?.status === 401) navigate("/Auth");
    }
  };

  useEffect(() => {
    fetchMyProjects();
  }, [activeTab]);

  // Submit Project Logic
  const handleUpload = async () => {
    if (!file) return toast.warning("Please select a file first!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", projectType);
    formData.append("instructions", instructions);

    try {
      setLoading(true);
      // 3. Instance handles the base URL and Auth token automatically
      const { data } = await axiosInstance.post("/projects/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      if (data.success) {
        setFile(null);
        setInstructions("");
        fetchMyProjects();
        toast.success("Project submitted successfully! 🚀");
      }
    } catch (err) {
      console.error("Upload Error:", err);
      toast.error(err.response?.data?.message || "Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (url) => {
    if (!url) return;
    // Cloudinary URLs are usually HTTPS, but this keeps it safe
    const safeUrl = url.startsWith('http://') ? url.replace("http://", "https://") : url;
    window.open(safeUrl, "_blank");
    toast.info("Opening preview...");
  };

  const receivedFiles = myProjects.filter(p => p.status === "completed" && p.translatedFileUrl);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* --- HORIZONTAL NAVBAR --- */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-all">
            <div className="bg-[#0054A6] p-2 rounded-lg text-white">
              <FolderOpen size={20} />
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">Denyo Portal</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
            <div className="w-6 h-6 bg-[#0054A6] rounded-full flex items-center justify-center text-[10px] text-white font-bold">
              {userInfo.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <span className="text-sm font-semibold text-slate-700">{userInfo.name || "User"}</span>
          </div>
          <Bell size={20} className="text-slate-400 cursor-pointer hover:text-blue-600 transition-colors" />
          <Settings size={20} className="text-slate-400 cursor-pointer hover:text-blue-600 transition-colors" />
        </div>
      </nav>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* --- SIDEBAR --- */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between">
          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-3">Navigation</p>
            
            <Link to="/" className="flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-all font-bold text-sm mb-4">
              <Home size={18} /> <span>Back to Home</span>
            </Link>

            <div className="h-[1px] bg-slate-100 my-4"></div>

            <div
              onClick={() => setActiveTab("submit")}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                activeTab === "submit" ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <Upload size={18} /> <span className="font-bold text-sm">Submit Project</span>
            </div>

            <div
              onClick={() => setActiveTab("inbox")}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                activeTab === "inbox" ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <div className="relative">
                <Inbox size={18} />
                {receivedFiles.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full border-2 border-white"></span>
                )}
              </div>
              <span className="font-bold text-sm">Inbox ({receivedFiles.length})</span>
            </div>
          </div>

          <button
            onClick={() => { localStorage.clear(); navigate("/Auth"); toast.info("Signed out"); }}
            className="flex items-center gap-3 p-3 text-slate-400 hover:text-red-500 transition-all font-bold text-sm"
          >
            <LogOut size={18} /> <span>Sign Out</span>
          </button>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          {activeTab === "submit" ? (
            <div className="max-w-4xl mx-auto space-y-8">
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-900">Request New Translation</h3>
                  <p className="text-slate-500">Select your file type and upload the document.</p>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
                    {["document", "image", "audio", "video"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setProjectType(t)}
                        className={`px-6 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                          projectType === t ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all group">
                    <div className="bg-white p-4 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform text-blue-600">
                        <Upload size={28} />
                    </div>
                    <p className="text-sm font-bold text-slate-600">{file ? file.name : "Click to select or drop file"}</p>
                    <input type="file" className="hidden" onChange={(e) => {
                        setFile(e.target.files[0]);
                        if(e.target.files[0]) toast.success("File attached!");
                    }} />
                  </label>

                  <div className="space-y-2">
                    <span className="text-xs font-black text-slate-400 uppercase ml-1">Translation Instructions</span>
                    <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="Explain what you need (e.g. 'Translate to Spanish', 'Formal tone')..."
                        className="w-full p-5 bg-slate-50 rounded-2xl h-32 text-sm outline-none border border-transparent focus:border-blue-200 transition-all"
                    />
                  </div>

                  <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="w-full bg-[#0054A6] text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 disabled:bg-slate-300 hover:bg-blue-700 transition-all"
                  >
                    {loading ? "UPLOADING..." : "SUBMIT PROJECT"}
                  </button>
                </div>
              </section>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {receivedFiles.length === 0 ? (
                <div className="col-span-full py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-center">
                  <Inbox className="mx-auto text-slate-200 mb-4" size={60} />
                  <p className="text-slate-400 font-bold">Your inbox is empty. We'll notify you when work is ready.</p>
                </div>
              ) : (
                receivedFiles.map((p) => (
                  <motion.div key={p._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600"><FileText size={24} /></div>
                      <div>
                        <h4 className="font-bold text-slate-800 capitalize">{p.fileType} Delivered</h4>
                        <p className="text-[10px] text-slate-400 font-bold">{new Date(p.updatedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button onClick={() => handleView(p.translatedFileUrl)} className="w-full bg-slate-900 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-black">
                        <Eye size={16} /> Preview
                      </button>
                      <a href={p.translatedFileUrl.replace("/upload/", "/upload/fl_attachment/")} className="w-full bg-blue-50 text-blue-600 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-100">
                        <Download size={16} /> Download
                      </a>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserProfile;