import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
// import useProviderChatt from "../../hooks/provider/useProviderChatt";

const Messages = () => {
  // const { data, error, isLoading } = useProviderChatt();
  // const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // useEffect(() => {
  //   if (error) {
  //     // navigate("/providers/login");
  //   }
  // }, [error, navigate]);

  // useEffect(() => {
  //   if (data) {
  //     setMessages(data);
  //   }
  // }, [data]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        content: newMessage,
        sender: "You",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center bg-gray-100">
  //       <div className="text-lg font-semibold text-gray-700">Loading...</div>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-grow p-6 flex flex-col">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            Provider Chat
          </h1>
          <div className="flex-grow bg-white p-4 rounded-lg shadow-md overflow-y-auto mb-4">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div key={msg.id} className="mb-4">
                  <div className="font-semibold">{msg.sender}</div>
                  <div>{msg.content}</div>
                  <div className="text-sm text-gray-500">{msg.timestamp}</div>
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
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-indigo-600 text-white p-2 rounded-r-lg"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
