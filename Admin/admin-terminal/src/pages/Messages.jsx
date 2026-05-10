import React, { useEffect, useState } from 'react';
// 1. Import your admin axios instance
import axiosInstance from '../api/axiosInstance';

const Messages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // 2. The instance handles the adminToken and Base URL automatically
                const { data } = await axiosInstance.get('/admin/messages');
                setMessages(data);
            } catch (err) {
                console.error("Msg fetch error:", err);
            }
        };
        fetchMessages();
    }, []);

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Contact Inquiries</h2>
            {messages.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-lg border border-dashed border-slate-200 text-slate-400">
                    No inquiries yet.
                </div>
            ) : (
                messages.map(m => (
                    <div key={m._id} className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800">{m.subject}</h3>
                        <p className="text-slate-600 text-sm my-2">{m.content}</p>
                        <p className="text-xs text-sky-600">From: {m.name} ({m.email})</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Messages;