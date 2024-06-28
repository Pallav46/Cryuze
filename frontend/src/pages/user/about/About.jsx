import React from 'react';
import { FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';

const About = () => {
  const contributors = [
    { 
        name:"Om Tewari",role: "Founder"   
    },
    {
        name:"Samrat Koushik",role: "Founder"
    },
    { name: 'Dev Bawari', role: 'Frontend Developer' },
    { name: 'Anshuman Arya', role: 'Frontend Developer' },
    { name: 'Pallav Kumar', role: 'Backend Developer' },
    
   
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-4">Our Organization</h1>
          <p className="text-center text-gray-600 mb-8">
            We are committed to delivering the best solutions to our clients. We are the best ...............
          </p>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-gray-600 mr-2" />
              <span className="text-gray-600">info@organization.com</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-gray-600 mr-2" />
              <span className="text-gray-600">+123 456 7890</span>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Contributors</h2>
            {contributors.map((contributor, index) => (
              <div key={index} className="flex items-center mb-4">
                <FaUser className="text-gray-600 mr-2" />
                <div>
                  <p className="text-gray-800">{contributor.name}</p>
                  <p className="text-gray-600 text-sm">{contributor.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
