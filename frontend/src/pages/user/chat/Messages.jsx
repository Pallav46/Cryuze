import { useEffect, useMemo, useState, useRef } from "react";
import io from "socket.io-client";
import useGetMessages from "../../../hooks/user/useGetMessages";
import useSendMessage from "../../../hooks/user/useSendMessage";
import { useAuthContext } from "../../../context/AuthContext";

const Messages = ({ providerId }) => {
  const { authUser } = useAuthContext();
  const { _id } = authUser?.user || {};
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const { data: initialMessages } = useGetMessages(providerId);
  const { sendMessage } = useSendMessage(providerId);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  const socket = useMemo(
    () =>
      io("https://x-website.onrender.com", {
        query: { userId: _id }
      }),
    [_id]
  );

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (data) => {
      console.log("Received new message: ", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const messageData = {
      message: input,
      senderId: _id,
      timestamp: new Date().toISOString()
    };

    await sendMessage(messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setInput("");
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full">
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
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              <p>{message.message}</p>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(message.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="bg-white border-t border-gray-300 py-3 px-4 flex items-center sticky bottom-0">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
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

export default Messages;
