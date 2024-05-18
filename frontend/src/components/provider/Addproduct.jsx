import React, { useState } from 'react';
import '../styles/AddProduct.css';
import NavBar from './NavBar';
import { redirect } from 'react-router-dom';
const AddProduct = ({ addProduct }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);

  const serviceOptions = [
    { name: 'Plumbing', image: 'https://th.bing.com/th/id/OIP.hMEof5CObAgDETy---FEfgHaEK?rs=1&pid=ImgDetMain' },
    { name: 'Electrician', image: 'https://th.bing.com/th/id/OIP.hMEof5CObAgDETy---FEfgHaEK?rs=1&pid=ImgDetMain'  },
    { name: 'Cleaning', image: 'https://th.bing.com/th/id/OIP.hMEof5CObAgDETy---FEfgHaEK?rs=1&pid=ImgDetMain'  },
    { name: 'Landscaping', image: 'https://th.bing.com/th/id/OIP.hMEof5CObAgDETy---FEfgHaEK?rs=1&pid=ImgDetMain'  },
    { name: 'Catering', image: 'https://th.bing.com/th/id/OIP.hMEof5CObAgDETy---FEfgHaEK?rs=1&pid=ImgDetMain' }
  ];

  const handleServiceClick = (service) => {
    setSelectedServices(prevServices =>
      prevServices.includes(service)
        ? prevServices.filter(s => s !== service)
        : [...prevServices, service]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      name: productName,
      description: productDescription,
      services: selectedServices
    };
    addProduct(product);
    console.log('Product added:', product);
   return <redirect to="/" />
  };

  return (
    <>
    <NavBar/>
    <div className='whole'>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
          <div className="service-grid">
            {serviceOptions.map(service => (
              <div
                key={service.name}
                className={`service-box ${selectedServices.includes(service.name) ? 'selected' : ''}`}
                onClick={() => handleServiceClick(service.name) }style={{"backgroundImage": `url(${service.image})`}}
              >
                <span className='text'>{service.name}</span>
              </div>
            ))}
         </div>
      </form>
        <div className='btn'>
        <button type="submit" onClick={handleSubmit}>Add Product</button>
        </div>
    </div>
    </>
  );
};

export default AddProduct;
