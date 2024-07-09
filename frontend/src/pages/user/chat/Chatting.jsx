import Conversations from './Conversations';
import Messages from './Messages';
import useUserChatt from "../../../hooks/user/useUserChatt";

const Chatting = () => {
  const { data: conversations, error, isLoading } = useUserChatt();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="flex h-[90vh]">
        {/* Conversations Sidebar */}
        {/* <div className="bg-gray-100 w-1/4 border-r border-gray-300 overflow-y-auto">
          <Conversations />
        </div> */}

        {/* Chat Messages */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-300 py-3 px-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {conversations.map((conversation) => (
                <div key={conversation.id}>{conversation.name}</div>
              ))}
            </h3>
            <div className="flex items-center space-x-2">
              {/* Additional header controls */}
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 bg-gray-100 overflow-y-auto p-4">
            <Messages />
          </div> 

          {/* Input Container */}
        </div>
      </div>
    </div>
  );
};

export default Chatting;
