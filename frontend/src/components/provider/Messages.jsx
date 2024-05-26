import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import useProviderGetMessages from "../../hooks/provider/useProviderGetMessages";
import useProviderSendMessage from "../../hooks/provider/useProviderSendMessage";
import io from "socket.io-client";
import { useAuth } from "../../context/ProviderAuthContext";

const Messages = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { authToken } = useAuth();
  const { _id } = authToken.user;

  const {
    data: initialMessages,
    loading: messageLoading,
    error: messageError,
  } = useProviderGetMessages(customerId);

  const { sendMessage, loading: sendLoading } = useProviderSendMessage(customerId);

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    if (messageError) {
      navigate("/providers/login");
    }
  }, [messageError, navigate]);

  const socket = useMemo(() => {
    const socketInstance = io("http://localhost:3030", {
      query: { userId: _id }
    });
    return socketInstance;
  }, [_id]);

  useEffect(() => {
    socket.emit("join", { customerId });

    socket.on("newMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // return () => {
    //   socket.off("newMessage");
    //   socket.disconnect();
    // };
  }, [socket, customerId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const messagePayload = {
        message: newMessage,
        senderId: _id,
        receiverId: customerId,
        timestamp: new Date().toISOString(),
      };
      await sendMessage({ message: newMessage });
      // socket.emit("newMessage", messagePayload);
      setMessages((prevMessages) => [...prevMessages, messagePayload]);
      setNewMessage(""); // Clear input after sending message
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (messageLoading || sendLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-6 flex flex-col">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Provider Chat</h1>
        <div className="flex-grow bg-white p-4 rounded-lg shadow-md overflow-y-auto mb-4">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.senderId === customerId ? "text-left" : "text-right"
                }`}
              >
                <div className="font-semibold">{msg.senderId === customerId ? "Customer" : "You"}</div>
                <div>{msg.message}</div>
                <div className="text-sm text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No messages yet.</p>
          )}
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-indigo-600 text-white p-2 rounded-r-lg"
            disabled={sendLoading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
