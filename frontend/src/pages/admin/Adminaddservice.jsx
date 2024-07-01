import React, { useState } from 'react';
import useCreateProduct from '../../hooks/admin/useCreateProduct';

const AddProduct = () => {
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [subcategories, setSubcategories] = useState([{ name: '', price: '', description: '' }]);
  const [image, setImage] = useState(null);
  const { createProduct, loading } = useCreateProduct(); // Use the createProduct hook

  const handleAddSubcategory = () => {
    setSubcategories([...subcategories, { name: '', price: '', description: '' }]);
  };

  const handleSubcategoryChange = (index, field, value) => {
    const newSubcategories = [...subcategories];
    newSubcategories[index][field] = value;
    setSubcategories(newSubcategories);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProduct({
        serviceName,
        description,
        category,
        priceRange,
        subCategories: subcategories,
        image
      });
      // Clear the form fields after successful submission
      setServiceName('');
      setDescription('');
      setCategory('');
      setPriceRange('');
      setSubcategories([{ name: '', price: '', description: '' }]);
      setImage(null);
    } catch (error) {
      // Handle errors from createProduct hook
      console.error("Failed to create product:", error);
    }
  };

  return (
    <div className="mt-10 max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Add Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Service Name</label>
          <input
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            rows="3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price Range</label>
          <input
            type="text"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Subcategories</label>
          {subcategories.map((subcategory, index) => (
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
                <button
                  type="button"
                  onClick={handleAddSubcategory}
                  className="ml-2 text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-md"
                >
                  +
                </button>
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <button
            type="submit"
            className={`w-full ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white p-2 rounded-md`}
            disabled={loading}
          >
            {loading ? 'Adding Service...' : 'Add Service'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
