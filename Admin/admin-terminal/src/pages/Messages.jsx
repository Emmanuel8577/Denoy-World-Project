import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Messages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const { data } = await axios.get('http://localhost:4000/api/admin/messages', {
                    headers: { Authorization: `Bearer ${token}` }
                });
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
            {messages.map(m => (
                <div key={m._id} className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800">{m.subject}</h3>
                    <p className="text-slate-600 text-sm my-2">{m.content}</p>
                    <p className="text-xs text-sky-600">From: {m.name} ({m.email})</p>
                </div>
            ))}
        </div>
    );
};

export default Messages;