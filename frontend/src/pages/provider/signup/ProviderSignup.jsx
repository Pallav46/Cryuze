// import { useState } from "react";
// import useProviderSignup from "../../../hooks/provider/useProviderSignup";

// const ServiceProviderSignup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     altPhoneNumber: "",
//     password: "",
//     confirmPassword: "",
//     location: {
//       address: "",
//       city: "",
//       state: "",
//       coordinates: [],
//     },
//   });

//   const { signup, loading } = useProviderSignup();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLocationChange = (e) => {
//     setFormData({
//       ...formData,
//       location: {
//         ...formData.location,
//         [e.target.name]: e.target.value,
//       },
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await signup(formData)
//   };

//   const getLocation = () => {
//     if (navigator.geolocation) {

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setFormData({
//             ...formData,
//             location: {
//               ...formData.location,
//               coordinates: [latitude, longitude],
//             },
//           });
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           Service Provider Signup
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="name" className="block font-medium mb-2">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="email" className="block font-medium mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="phoneNumber" className="block font-medium mb-2">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               id="phoneNumber"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="altPhoneNumber" className="block font-medium mb-2">
//               Alternative Phone Number
//             </label>
//             <input
//               type="tel"
//               id="altPhoneNumber"
//               name="altPhoneNumber"
//               value={formData.altPhoneNumber}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block font-medium mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="confirmPassword" className="block font-medium mb-2">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="address" className="block font-medium mb-2">
//               Address
//             </label>
//             <input
//               type="text"
//               id="address"
//               name="address"
//               value={formData.location.address}
//               onChange={handleLocationChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="city" className="block font-medium mb-2">
//               City
//             </label>
//             <input
//               type="text"
//               id="city"
//               name="city"
//               value={formData.location.city}
//               onChange={handleLocationChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="state" className="block font-medium mb-2">
//               State
//             </label>
//             <input
//               type="text"
//               id="state"
//               name="state"
//               value={formData.location.state}
//               onChange={handleLocationChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <button
//               type="button"
//               className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onClick={getLocation}
//             >
//               Get Current Location
//             </button>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="latitude" className="block font-medium mb-2">
//               Latitude
//             </label>
//             <input
//               type="text"
//               id="latitude"
//               name="latitude"
//               value={formData.location.latitude}
//               onChange={handleLocationChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               readOnly
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="longitude" className="block font-medium mb-2">
//               Longitude
//             </label>
//             <input
//               type="text"
//               id="longitude"
//               name="longitude"
//               value={formData.location.longitude}
//               onChange={handleLocationChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               readOnly
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ServiceProviderSignup;

// import { useState } from "react";
// import useProviderSignup from "../../../hooks/provider/useProviderSignup";

// const ServiceProviderSignup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     altPhoneNumber: "",
//     password: "",
//     confirmPassword: "",
//     location: {
//       address: "",
//       city: "",
//       state: "",
//       coordinates: [], // Coordinates stored as an array
//     },
//   });

//   const { signup, loading } = useProviderSignup();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await signup(formData);
//   };

//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setFormData({
//             ...formData,
//             location: {
//               ...formData.location,
//               coordinates: [latitude, longitude], // Update coordinates array
//             },
//           });
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           Service Provider Signup
//         </h2>
//         <form onSubmit={handleSubmit}>
//           {/* Your form fields */}
//           <div className="mb-4">
//             <button
//               type="button"
//               className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onClick={getLocation}
//             >
//               Get Current Location
//             </button>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="latitude" className="block font-medium mb-2">
//               Latitude
//             </label>
//             <input
//               type="text"
//               id="latitude"
//               name="latitude"
//               value={formData.location.coordinates[0]} // Access latitude from coordinates array
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               readOnly
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="longitude" className="block font-medium mb-2">
//               Longitude
//             </label>
//             <input
//               type="text"
//               id="longitude"
//               name="longitude"
//               value={formData.location.coordinates[1]} // Access longitude from coordinates array
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               readOnly
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ServiceProviderSignup;

import { useState } from "react";
import useProviderSignup from "../../../hooks/provider/useProviderSignup";

const ServiceProviderSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    altPhoneNumber: "",
    password: "",
    confirmPassword: "",
    location: {
      address: "",
      city: "",
      state: "",
      coordinates: {
        type: "Point",
        coordinates: [],
      }, // Coordinates stored as an array
    },
  });

  const { signup } = useProviderSignup();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (e) => {
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({
            ...formData,
            location: {
              ...formData.location,
              coordinates: { 
                type: "Point",
                coordinates: [latitude, longitude],
              },
            },
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Service Provider Signup
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="altPhoneNumber" className="block font-medium mb-2">
              Alternative Phone Number
            </label>
            <input
              type="tel"
              id="altPhoneNumber"
              name="altPhoneNumber"
              value={formData.altPhoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.location.address}
              onChange={handleLocationChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block font-medium mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.location.city}
              onChange={handleLocationChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="state" className="block font-medium mb-2">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.location.state}
              onChange={handleLocationChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="button"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={getLocation}
            >
              Get Current Location
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="latitude" className="block font-medium mb-2">
              Latitude
            </label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              value={formData.location.coordinates.coordinates[0]} // Display latitude
              onChange={handleLocationChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="longitude" className="block font-medium mb-2">
              Longitude
            </label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              value={formData.location.coordinates.coordinates[1]} // Display longitude
              onChange={handleLocationChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceProviderSignup;
