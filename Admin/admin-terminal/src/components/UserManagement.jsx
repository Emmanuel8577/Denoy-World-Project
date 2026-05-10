import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Mail, ChevronDown, ChevronUp, FileUp, CheckCircle } from "lucide-react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null); // Tracks which user's projects are shown
  const [uploadingId, setUploadingId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("adminToken");
      try {
        const { data } = await axios.get("http://localhost:4000/api/admin/all-users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(data.users);
      } catch (err) {
        console.error("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  const handleResendFile = async (projectId, file) => {
    if (!file) return;
    const token = localStorage.getItem("adminToken");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("projectId", projectId);

    try {
      setUploadingId(projectId);
      const { data } = await axios.post("http://localhost:4000/api/admin/upload-completed", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        alert("File delivered to user!");
        // Refresh local state logic here
      }
    } catch (err) {
      alert("Delivery failed.");
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      <h2 className="text-2xl font-bold text-slate-800 tracking-tight">User Directory</h2>
      
      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user._id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            {/* User Header */}
            <div 
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition"
              onClick={() => setExpandedUser(expandedUser === user._id ? null : user._id)}
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-600">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{user.name}</h3>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                    <Mail size={12} /> {user.email}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-bold uppercase">
                  {user.projects?.length || 0} Projects
                </span>
                {expandedUser === user._id ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
              </div>
            </div>

            {/* User Projects Section (Expanded) */}
            {expandedUser === user._id && (
              <div className="bg-slate-50/50 p-4 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase px-2 mb-2">Projects from {user.name}</h4>
                {user.projects?.length > 0 ? user.projects.map((p) => (
                  <div key={p._id} className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-slate-700 capitalize">{p.type} Request</p>
                      <p className="text-xs text-slate-400 italic">"{p.instructions || "No instructions"}"</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {/* Send File Back Button */}
                      <label className="cursor-pointer bg-sky-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-sky-700 transition shadow-sm">
                        <FileUp size={14} /> 
                        {uploadingId === p._id ? "Uploading..." : "Deliver Result"}
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={(e) => handleResendFile(p._id, e.target.files[0])}
                          disabled={uploadingId === p._id}
                        />
                      </label>
                      
                      {p.status === "completed" && (
                        <CheckCircle size={18} className="text-green-500" />
                      )}
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-slate-400 italic px-2">This user has no projects yet.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;