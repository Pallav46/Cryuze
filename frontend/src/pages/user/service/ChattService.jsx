import  { useState } from 'react';
import { format } from 'date-fns';
import useGetProvider from '../../../hooks/user/useGetProvider'
import { useParams } from 'react-router-dom';

const ChattService = () => {
  const { providerId } = useParams();
  const { data, loading, error } = useGetProvider(providerId);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Check if data is loading or if there's an error
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Check if data is null
  if (!data || !data.data) return <div>No data available</div>;

  const { name, email, avatar } = data.data;


  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { id: messages.length, text: input, timestamp: new Date() }]);
      setInput('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white shadow-lg rounded-lg flex flex-col h-full max-h-[80vh] overflow-hidden">
        {/* Profile Section */}
        <div className="flex items-center p-4 bg-gray-200">
          <img src={avatar} alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-gray-700">{email}</p>
          </div>
        </div>

        {/* Message List */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <ul className="space-y-4">
            {messages.map((message) => (
              <li key={message.id} className="bg-blue-100 p-3 rounded-lg flex justify-between items-end">
                <span className="text-gray-800">{message.text}</span>
                <span className="text-sm text-gray-500">{format(message.timestamp, 'p')}</span>
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
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
