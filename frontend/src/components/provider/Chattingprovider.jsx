import Messagesprov from './Messagesprov.jsx';
import Sidebar from './Sidebar.jsx';
import DarkMode from './DarkMode.jsx'

const Chatting = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <DarkMode />
      <div className="flex-1 flex flex-col">
        <div className="bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600 py-3 px-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Customer</h3>
          <div className="flex items-center space-x-2">
            {/* Additional content can be added here */}
          </div>
        </div>
        <div className="flex-1 bg-gray-100 dark:bg-gray-900 overflow-y-auto p-4">
          <Messagesprov />
        </div>
      </div>
    </div>
  );
};

export default Chatting;
