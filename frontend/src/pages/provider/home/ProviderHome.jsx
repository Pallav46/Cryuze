// import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit } from '@fortawesome/free-solid-svg-icons';
// import Sidebar from '../../../components/provider/Sidebar';
// // import NavBar from '../../../components/provider/NavBar'; // Assuming NavBar is located here

// const ProviderHome = ({ products, setProducts, removeProduct }) => {
//   const [isEditing, setIsEditing] = useState(null);
//   const [editedProduct, setEditedProduct] = useState({
//     name: '',
//     price: '',
//     image: '',
//     description: ''
//   });

//   const handleEditClick = (index) => {
//     setIsEditing(index);
//     setEditedProduct(products[index]);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedProduct({ ...editedProduct, [name]: value });
//   };

//   const handleSaveClick = (index) => {
//     const updatedProducts = products.map((product, i) =>
//       i === index ? editedProduct : product
//     );
//     setProducts(updatedProducts);
//     setIsEditing(null);
//   };

//   return (
//     <>
//       {/* <NavBar /> */}
//       <div className="dashboard">
//         <Sidebar />
//         <div className="content">
//           <h1>Admin Dashboard</h1>
//           <p>Welcome to the admin dashboard.</p>
//           <h2>Product List</h2>
//           <ul>
//             {products.map((product, index) => (
//               <li key={index} className="product-item">
//                 {isEditing === index ? (
//                   <div className="edit-form">
//                     <div>
//                       <label>Name:</label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={editedProduct.name}
//                         onChange={handleInputChange}
//                       />
//                     </div>
//                     <div>
//                       <label>Price:</label>
//                       <input
//                         type="number"
//                         name="price"
//                         value={editedProduct.price}
//                         onChange={handleInputChange}
//                       />
//                     </div>
//                     <div>
//                       <label>Image URL:</label>
//                       <input
//                         type="text"
//                         name="image"
//                         value={editedProduct.image}
//                         onChange={handleInputChange}
//                       />
//                     </div>
//                     <div>
//                       <label>Description:</label>
//                       <textarea
//                         name="description"
//                         value={editedProduct.description}
//                         onChange={handleInputChange}
//                       ></textarea>
//                     </div>
//                     <button onClick={() => handleSaveClick(index)}>Save</button>
//                   </div>
//                 ) : (
//                   <>
//                     <img src={product.image} alt={product.name} className="product-image" />
//                     <div className="product-details">
//                       <h3>{product.name} - ${product.price}</h3>
//                       <p>{product.description}</p>
//                     </div>
//                     <FontAwesomeIcon
//                       icon={faEdit}
//                       className="edit-icon"
//                       onClick={() => handleEditClick(index)}
//                     />
//                   </>
//                 )}
//                 <button onClick={() => removeProduct(index)}>Remove</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProviderHome;

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../../../components/provider/Sidebar';

const ProviderHome = () => {
  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-grow p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Service Provider Dashboard</h1>
          <p className="mb-6 text-gray-600">Welcome to the service provider dashboard.</p>
        </div>
      </div>
    </>
  );
};

export default ProviderHome;

