import '../styles/Dashboard.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import NavBar from './NavBar';
const Dashboard = ({ products, setProducts, removeProduct }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: 'apple',
    price: '1000',
    image: 'https://th.bing.com/th/id/OIP.hMEof5CObAgDETy---FEfgHaEK?rs=1&pid=ImgDetMain',
    description: '1234'
  });

  const handleEditClick = (index) => {
    setIsEditing(index);
    setEditedProduct(products[index]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSaveClick = (index) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? editedProduct : product
    );
    setProducts(updatedProducts);
    setIsEditing(null);
  };

  return (
    <>
    <NavBar />
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard.</p>
      <h2>Product List</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {isEditing === index ? (
              <div className="edit-form">
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Image URL:</label>
                  <input
                    type="text"
                    name="image"
                    value={editedProduct.image}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={editedProduct.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <button onClick={() => handleSaveClick(index)}>Save</button>
              </div>
            ) : (
              <>
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-details">
                  <h3>{product.name} - ${product.price}</h3>
                  <p>{product.description}</p>
                </div>
                <FontAwesomeIcon 
                  icon={faEdit} 
                  className="edit-icon" 
                  onClick={() => handleEditClick(index)} 
                />
              </>
            )}
            <button onClick={() => removeProduct(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Dashboard;
