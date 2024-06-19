import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Allservices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the services from a data source (API or local state)
    // For demonstration, let's use some dummy data
    setServices([
      { id: 1, name: 'Service 1', priceRange: '$100 - $200', subcategories: [{ name: 'Sub 1', price: '$50', description: 'Sub 1 desc' }] },
      { id: 2, name: 'Service 2', priceRange: '$200 - $300', subcategories: [{ name: 'Sub 2', price: '$100', description: 'Sub 2 desc' }] }
    ]);
  }, []);

//   const handleEdit = (serviceId) => {
//     navigate(`admin/editservices`);
//   };

  const handleDelete = (serviceId) => {
    setServices(services.filter(service => service.id !== serviceId));
  };

  return (
    <div className="max-w-4xl mt-10 mx-auto bg-white shadow-md rounded-lg p-6 ">
      <h2 className="text-2xl font-semibold mb-4">All Services</h2>
      <ul className="space-y-4">
        {services.map(service => (
          <li key={service.id} className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{service.name}</h3>
                <p className="text-gray-600">{service.priceRange}</p>
              </div>
              <div>
                <Link to={`/admin/editservices`}>
                <button
                  onClick={() => handleEdit(service.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
                >
                  Edit
                </button>
                </Link>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Allservices;
