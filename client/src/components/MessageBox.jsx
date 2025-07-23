import React, { useEffect, useState } from 'react';
import { createMessage, getConversations } from '../api/api';

const MessageBox = ({ senderId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  
  // Fetch conversation history
  const fetchHistory = async () => {
    try {
      const data = await getConversations(senderId, receiverId);
      setMessages(data);
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  };
  useEffect(() => {
    
    fetchHistory();
  }, [senderId, receiverId]);

   
  const handleSend = async () => {
    if (text.trim()) {
      await createMessage(senderId, receiverId, text);
      setText('');
      const updated = await getConversations(senderId, receiverId);
      console.log("Updated messages:", updated.data);
      setMessages(updated.data);
      console.log("Messages after sending:", messages.data);
    }
  };

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-header bg-white">
        <h6 className="mb-0 text-muted">Chat History</h6>
      </div>

      <div className="card-body" style={{ maxHeight: '300px', overflowY: 'auto', background: '#f8f9fa' }}>
        {messages!=null && messages.length > 0 ? (
          messages.map((msg, idx) => (
            <div key={idx} className={`d-flex mb-2 ${msg.senderId === senderId ? 'justify-content-end' : 'justify-content-start'}`}>
              <div className={`px-3 py-2 rounded ${msg.senderId === senderId ? 'bg-success text-white' : 'bg-light text-dark'}`}>
                {msg.message}
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center">
            <ul>
                {messages!=null && messages.length && messages.map((msg, idx) => (
                  <li key={idx} className={`d-flex mb-2 ${msg.senderId === senderId ? 'justify-content-end' : 'justify-content-start'}`}>
                    <div className={`px-3 py-2 rounded ${msg.senderId === senderId ? 'bg-success text-white' : 'bg-light text-dark'}`}>
                      {msg.message}
                </div>
                  </li>))}
            </ul>
          </p>
        )}
      </div>

      <div className="card-footer bg-white">
        <textarea
          className="form-control mb-2"
          rows="2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="btn btn-success w-100" onClick={handleSend}>
        Send 
          {/* {BaseLocalization.send} */}
        </button>
      </div>
    </div>
  );
};

export default React.memo(MessageBox);