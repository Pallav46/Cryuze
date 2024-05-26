import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import useGetProvider from "../../../hooks/user/useGetProvider";
import useGetMessages from "../../../hooks/user/useGetMessages";
import useSendMessage from "../../../hooks/user/useSendMessage";
import { useAuthContext } from "../../../context/AuthContext";
import io from "socket.io-client";

const ChattService = () => {
  const { authUser } = useAuthContext();
  const { _id } = authUser?.user || {};
  const { providerId } = useParams();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const { data: providerData, loading: providerLoading, error: providerError } = useGetProvider(providerId);
  const { data: initialMessages, loading: messageLoading, error: messageError } = useGetMessages(providerId);
  const { sendMessage } = useSendMessage(providerId);

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  const socket = useMemo(
    () =>
      io("http://localhost:3030", {
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

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const messageData = {
      message: input
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

  if (providerLoading || messageLoading) return <div>Loading...</div>;
  if (providerError || messageError) return <div>Error: {providerError?.message || messageError?.message}</div>;

  if (!providerData) return <div>No provider data available</div>;

  const { name, email, avatar } = providerData;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white shadow-lg rounded-lg flex flex-col h-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center p-4 bg-gray-200">
          <img src={avatar} alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-gray-700">{email}</p>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <ul className="space-y-4">
            {messages.map((message, index) => (
              <li key={index} className={`p-3 rounded-lg flex justify-between items-end ${message.receiverId === providerId ? "bg-green-100" : "bg-blue-100"}`}>
                <span className={`text-gray-800 ${message.receiverId === providerId ? "text-green-800" : "text-gray-800"}`}>
                  {message.message}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
          />
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white p-2 rounded-r-lg"
            disabled={false}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChattService;
