import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AdminEditService = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  useEffect(() => {
    // Fetch the service details from a data source (API or local state)
    // For demonstration, let's use some dummy data
    const fetchedService = {
      id: serviceId,
      name: `Service ${serviceId}`,
      priceRange: `$100 - $200`,
      subcategories: [{ name: 'Sub 1', price: '$50', description: 'Sub 1 desc' }]
    };
    setService(fetchedService);
  }, [serviceId]);

  const handleSubcategoryChange = (index, field, value) => {
    const newSubcategories = [...service.subcategories];
    newSubcategories[index][field] = value;
    setService({ ...service, subcategories: newSubcategories });
  };

  const handleSave = () => {
    // Save the updated service details to the data source
    console.log('Updated service:', service);
    navigate('/');
  };

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mt-20 mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Service</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Service Name</label>
          <input
            type="text"
            value={service.name}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price Range</label>
          <input
            type="text"
            value={service.priceRange}
            onChange={(e) => setService({ ...service, priceRange: e.target.value })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Subcategories</label>
          {service.subcategories.map((subcategory, index) => (
            <div key={index} className="mb-2">
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  value={subcategory.name}
                  onChange={(e) => handleSubcategoryChange(index, 'name', e.target.value)}
                  className="mt-1 block w-1/3 p-2 border border-gray-300 rounded-md mr-2"
                  placeholder="Subcategory Name"
                  required
                />
                <input
                  type="text"
                  value={subcategory.price}
                  onChange={(e) => handleSubcategoryChange(index, 'price', e.target.value)}
                  className="mt-1 block w-1/3 p-2 border border-gray-300 rounded-md mr-2"
                  placeholder="Subcategory Price"
                  required
                />
              </div>
              <textarea
                value={subcategory.description}
                onChange={(e) => handleSubcategoryChange(index, 'description', e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Subcategory Description"
                rows="2"
                required
              />
            </div>
          ))}
        </div>
        <div>
          <button
            type="button"
            onClick={handleSave}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditService;
