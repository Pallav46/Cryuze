import { useEffect, useMemo, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProviderGetMessages from "../../hooks/provider/useProviderGetMessages";
import useProviderSendMessage from "../../hooks/provider/useProviderSendMessage";
import io from "socket.io-client";
import { useAuth } from "../../context/ProviderAuthContext";

const Messagesprov = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { authToken } = useAuth();
  const _id = authToken?.user?._id;
  const messagesEndRef = useRef(null);

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
    const socketInstance = io("https://x-website.onrender.com", {
      query: { userId: _id }
    });
    return socketInstance;
  }, [_id]);

  useEffect(() => {
    socket.emit("join", { customerId });

    socket.on("newMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("newMessage");
      socket.disconnect();
    };
  }, [socket, customerId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    try {
      const messagePayload = {
        message: input,
        senderId: _id,
        receiverId: customerId,
        timestamp: new Date().toISOString(),
      };
      await sendMessage({ message: input });
      setMessages((prevMessages) => [...prevMessages, messagePayload]);
      setInput(""); // Clear input after sending message
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };
  return (
    <div className="flex flex-col h-full dark:bg-gray-900">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`my-2 flex ${
              message.senderId === _id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-2/3 py-2 px-4 rounded-lg ${
                message.senderId === _id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              <p>{message.message}</p>
              <div className="text-xs text-gray-400 mt-1 dark:text-gray-500">
                {new Date(message.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-600 py-3 px-4 flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSubmit}
          className="ml-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messagesprov;
