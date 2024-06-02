import React, { useState } from 'react';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');

    const handleAddProduct = () => {
        // Add product logic here
        console.log('Product Added:', { productName, productPrice });
    };

    return (
        <div className="p-4 flex-1">
            <h1 className="text-2xl font-bold mb-4">Add New Service</h1>
            <div className="p-4 bg-white shadow rounded-lg">
                <div className="mb-4">
                    <label className="block text-gray-700">Service Name</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Product Price</label>
                    <input
                        type="text"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    onClick={handleAddProduct}
                    className="p-2 bg-blue-500 text-white rounded"
                >
                    Add Product
                </button>
            </div>
        </div>
    );
};

export default AddProduct;
