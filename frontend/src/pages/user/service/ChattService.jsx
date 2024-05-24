import { useState } from "react";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import useGetProvider from "../../../hooks/user/useGetProvider";
import useGetMessages from "../../../hooks/user/useGetMessages";
import useSendMessage from "../../../hooks/user/useSendMessage";
import useChatSocket from "../../../hooks/user/useChatSocket"; // Import the custom hook

const ChattService = () => {
  const { providerId } = useParams();

  // Fetch provider data
  const { data: providerData, loading: providerLoading, error: providerError } = useGetProvider(providerId);
  // Fetch initial messages data
  const { data: initialMessages, loading: messageLoading, error: messageError } = useGetMessages(providerId);
  console.log(initialMessages);
  // Handle real-time messages
  const { messages: realTimeMessages } = useChatSocket(providerId);

  // Combine initial messages with real-time messages
  const allMessages = [...(initialMessages || []), ...realTimeMessages];

  // Send message
  const { sendMessage, loading: sendLoading } = useSendMessage(providerId);

  const [input, setInput] = useState(""); // State to manage input value

  const handleSubmit = async () => {
    if (!input.trim()) return;
    try {
      await sendMessage({ message: input });
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

  if (providerLoading || messageLoading) return <div>Loading...</div>;
  if (providerError || messageError) return <div>Error: {providerError?.message || messageError?.message}</div>;

  if (!providerData) return <div>No provider data available</div>;

  const { name, email, avatar } = providerData;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white shadow-lg rounded-lg flex flex-col h-full max-h-[80vh] overflow-hidden">
        {/* Profile Section */}
        <div className="flex items-center p-4 bg-gray-200">
          <img
            src={avatar}
            alt="Avatar"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-gray-700">{email}</p>
          </div>
        </div>

        {/* Message List */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <ul className="space-y-4">
            {allMessages.map((message) => (
              <li
                key={message._id}
                className={`p-3 rounded-lg flex justify-between items-end ${
                  message.receiverId === providerId ? "bg-green-100" : "bg-blue-100"
                }`}
              >
                <span className={`text-gray-800 ${
                  message.receiverId === providerId ? "text-green-800" : "text-gray-800"
                }`}>
                  {message.message}
                </span>
                <span className="text-sm text-gray-500">
                  {format(new Date(message.createdAt), "p")}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Input Box */}
        <div className="p-4 border-t bg-gray-200">
          <div className="flex">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)} // Update input value
              onKeyPress={handleKeyPress} // Call handleKeyPress on key press
              disabled={sendLoading}
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={sendLoading}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChattService;
