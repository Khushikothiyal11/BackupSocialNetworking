// import React, { useEffect, useState } from 'react';
// import { createMessage, getConversations } from '../api/api';
// import { useParams } from 'react-router-dom';

// const ChatPage = () => {
//   const { recipientId } = useParams();
//   const [senderId, setSenderId] = useState('64ac1f2e31e48e123abc4567');

//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     const fetchMessages = async () => {
//       const data = await getConversations(senderId, recipientId);
//       setMessages(data);
//     };
//     fetchMessages();
//   }, [senderId, recipientId]);

//   const handleSend = async () => {
//     alert('hi')
//     console.log('**************',senderId, recipientId, newMessage);

//     if (newMessage.trim()) {
//       await createMessage(senderId, recipientId, newMessage);
//       setNewMessage('');
//       const updatedMessages = await getConversations(senderId, recipientId);
//       setMessages(updatedMessages);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h4 className="mb-3">Chat with {recipientId}</h4>

//       <div
//         className="border rounded p-3 mb-3"
//         style={{ height: '60vh', overflowY: 'auto', backgroundColor: '#f9f9f9' }}
//       >
//         {messages.length > 0 ? (
//           messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`d-flex mb-2 ${msg.senderId === senderId ? 'justify-content-end' : 'justify-content-start'}`}
//             >
//               <div
//                 className={`p-2 rounded ${msg.senderId === senderId ? 'bg-primary text-white' : 'bg-light text-dark'}`}
//                 style={{ maxWidth: '75%' }}
//               >
//                 {msg.message}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-muted text-center mt-5">No messages yet. Start the conversation!</p>
//         )}
//       </div>

//       <textarea
//         className="form-control"
//         rows="2"
//         value={newMessage}
//         onChange={(e) => setNewMessage(e.target.value)}
//         placeholder="Type your message..."
//       />
//       <input type="button" value="Send" className="btn btn-success mt-2 float-end" onClick={handleSend}>
//       </input>
//     </div>
//   );
// };

// export default ChatPage;