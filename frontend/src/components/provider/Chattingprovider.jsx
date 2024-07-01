import Messagesprov from './Messagesprov.jsx';
import Sidebar from './Sidebar.jsx';
const Chatting = () => {
    
  return (
    <div className="flex h-screen">
        <Sidebar    />
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-300 py-3 px-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Selected conversation name</h3>
          <div className="flex items-center space-x-2">
          </div>
        </div>
        <div className="flex-1 bg-grey-100 overflow-y-auto p-4">
          <Messagesprov />
        </div>         
      </div>
    </div>
  );
};

export default Chatting;