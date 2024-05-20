// import React from 'react';
import { useParams } from 'react-router-dom';
import useGetService from '../../../hooks/useGetService';

const Service = () => {
  const { id } = useParams();
  const { data: serviceData, loading, error } = useGetService(id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { category, description, name, priceRange, subCategories } = serviceData.data;

  return (
    <div>
      <h2>{name}</h2>
      <p>Description: {description}</p>
      <p>Category: {category}</p>
      <p>Price Range: {priceRange}</p>
      <h3>Subcategories:</h3>
      <ul>
        {subCategories.map(subCategory => (
          <li key={subCategory._id}>
            <p>Name: {subCategory.name}</p>
            <p>Description: {subCategory.description}</p>
            <p>Price: ${subCategory.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Service;