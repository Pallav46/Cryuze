import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faPlus, faComments, faSignOutAlt, faNavicon, faEdit } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => (
  <div className="w-64  min-h-screen bg-blue-900 text-white flex flex-col">
    <div className="px-6 py-4">
      <h2 className="text-2xl font-bold">Service Provider</h2>
    </div>
    <ul className="flex-grow">
      <li className="px-6 py-2 hover:bg-blue-700">
        <Link to="/providers/dashboard" className="flex items-center">
          <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
          Dashboard
        </Link>
      </li>
      <li className="px-6 py-2 hover:bg-blue-700">
        <Link to="/providers/services" className="flex items-center">
          <FontAwesomeIcon icon={faPlus} className="mr-3" />
          Add Service
        </Link>
      </li>
      <li className="px-6 py-2 hover:bg-blue-700">
        <Link to="/providers/chat" className="flex items-center">
          <FontAwesomeIcon icon={faComments} className="mr-3" />
          Chat
        </Link>
      </li>
      <li className="px-6 py-2 hover:bg-blue-700">
        <Link to="/providers/notifi" className="flex items-center">
          <FontAwesomeIcon icon={faNavicon} className="mr-3" />
          Notification
        </Link>
      </li>
      <li className="px-6 py-2 hover:bg-blue-700">
        <Link to="/providers/edit" className="flex items-center">
          <FontAwesomeIcon icon={faEdit} className="mr-3" />
          Edit Profile
        </Link>
      </li>
      <li className="px-6 py-2 hover:bg-blue-700">
        <Link to="/providers/logout" className="flex items-center">
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
          Logout
        </Link>
      </li>
    </ul>
    <div className="px-6 py-4 border-t border-blue-800">
      <p className="text-sm text-blue-300">&copy; 2024 Service Provider</p>
    </div>
  </div>
);

export default Sidebar;
