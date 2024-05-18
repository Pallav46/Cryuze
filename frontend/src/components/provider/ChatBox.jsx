import React, { useState } from 'react';
import '../styles/Chatbox.css'
import NavBar from './NavBar';
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const messages = {
  1: [{ sender: 'Alice', text: 'Hi there!' }, { sender: 'Me', text: 'Hello Alice!' }],
  2: [{ sender: 'Bob', text: 'Hey!' }, { sender: 'Me', text: 'Hey Bob!' }],
  3: [{ sender: 'Charlie', text: 'Hello!' }, { sender: 'Me', text: 'Hi Charlie!' }]
};

const ChatBox = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <>
    <NavBar />
    <div className="chat-box">
      <div className="user-list">
        <h2>Users</h2>
        <ul>
          {users.map(user => (
            <li key={user.id} onClick={() => handleUserClick(user)}>
              {user.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-window">
        {selectedUser ? (
          <>
            <h2>Chat with {selectedUser.name}</h2>
            <div className="messages">
              {messages[selectedUser.id].map((msg, index) => (
                <div key={index} className={`message ${msg.sender === 'Me' ? 'me' : 'them'}`}>
                  <strong>{msg.sender}: </strong>{msg.text}
                </div>
              ))}
            </div>
            <div className="input-area">
              <input type="text" placeholder="Type a message..." />
              <button>Send</button>
            </div>
          </>
        ) : (
          <p>Select a user to start chatting</p>
        )}
      </div>
    </div>
    </>
  );
};

export default ChatBox;
