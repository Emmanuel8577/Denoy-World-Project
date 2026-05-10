import React, { useEffect, useState } from "react";
// 1. Switch to your custom admin instance
import axiosInstance from "../api/axiosInstance"; 
import { 
  Mail, 
  FileUp, 
  AlertCircle, 
  Loader2, 
  Search, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp,
  Clock,
  ExternalLink
} from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadingId, setUploadingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedUser, setExpandedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // 2. No manual token or full URL needed
      const { data } = await axiosInstance.get("/admin/all-users");
      if (data.success) {
        setUsers(data.users);
        setError(null);
      }
    } catch (err) {
      setError("Failed to fetch users. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDeliver = async (projectId, file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("projectId", projectId);

    try {
      setUploadingId(projectId);
      // 3. Simplified post request
      const { data } = await axiosInstance.post("/admin/upload-completed", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data.success) {
        alert("File successfully delivered to user inbox!");
        fetchUsers();
      }
    } catch (err) {
      alert("Upload failed. Please try again.");
    } finally {
      setUploadingId(null);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center text-slate-400">
      <Loader2 className="animate-spin mb-4" size={40} />
      <p className="font-medium">Loading User Records...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">User Directory</h1>
          <p className="text-slate-500 text-sm">Manage clients and deliver completed assets.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-72 transition-all shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 border border-red-100">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      {/* USER LIST */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <div key={user._id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all">
            {/* User Row */}
            <div 
              className={`p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors ${expandedUser === user._id ? 'bg-slate-50' : ''}`}
              onClick={() => setExpandedUser(expandedUser === user._id ? null : user._id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#0054A6] text-white flex items-center justify-center rounded-xl font-bold text-lg shadow-inner">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 leading-none mb-1">{user.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 flex items-center gap-1"><Mail size={12}/> {user.email}</span>
                    <span className="text-[10px] font-bold bg-blue-100 text-[#0054A6] px-2 py-0.5 rounded-full uppercase">
                      {user.projects?.length || 0} Projects
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {user.projects?.some(p => p.status === 'pending') && (
                  <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                )}
                {expandedUser === user._id ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
              </div>
            </div>

            {/* Expanded Projects Section */}
            {expandedUser === user._id && (
              <div className="p-6 bg-white border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Project Management</h4>
                
                <div className="space-y-3">
                  {user.projects && user.projects.length > 0 ? (
                    user.projects.map((project) => (
                      <div key={project._id} className="group flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md hover:border-blue-100 transition-all">
                        <div className="mb-3 md:mb-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-slate-700 capitalize">{project.type} Project</span>
                            {project.status === 'completed' ? (
                              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1">
                                <CheckCircle size={10} /> Delivered
                              </span>
                            ) : (
                              <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1">
                                <Clock size={10} /> Pending
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-500 max-w-md italic">"{project.instructions || "No specific instructions provided."}"</p>
                        </div>

                        <div className="flex items-center gap-3">
                          {project.status === 'completed' ? (
                            <button 
                              disabled
                              className="bg-slate-100 text-slate-400 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 cursor-not-allowed"
                            >
                              <CheckCircle size={14} /> Asset Sent
                            </button>
                          ) : (
                            <label className="cursor-pointer bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#0054A6] transition-all flex items-center gap-2 shadow-sm">
                              {uploadingId === project._id ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <FileUp size={14} />
                              )}
                              {uploadingId === project._id ? "Uploading..." : "Deliver Final Asset"}
                              <input 
                                type="file" 
                                className="hidden" 
                                onChange={(e) => handleDeliver(project._id, e.target.files[0])} 
                                disabled={uploadingId === project._id}
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-sm text-slate-400">This user hasn't submitted any projects yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;