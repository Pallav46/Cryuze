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
//       coordinates: {
//         type: "Point",
//         coordinates: [],
//       }, // Coordinates stored as an array
//     },
//   });

//   const { signup } = useProviderSignup();

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
//               coordinates: {
//                 type: "Point",
//                 coordinates: [latitude, longitude],
//               },
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
//               value={formData.location.coordinates.coordinates[0]} // Display latitude
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
//               value={formData.location.coordinates.coordinates[1]} // Display longitude
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
// import axios from "axios";

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
//       coordinates: {
//         type: "Point",
//         coordinates: [],
//       }, // Coordinates stored as an array
//     },
//   });

//   const { signup } = useProviderSignup();

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
//     await signup(formData);
//   };

//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setFormData((prevFormData) => ({
//             ...prevFormData,
//             location: {
//               ...prevFormData.location,
//               coordinates: {
//                 type: "Point",
//                 coordinates: [longitude, latitude],
//               },
//             },
//           }));
//           fetchAddress(latitude, longitude);
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//         },
//         { enableHighAccuracy: true }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   const fetchAddress = async (latitude, longitude) => {
//     try {
//       const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=a02e2770e11748368699e21a1669f523`);
//       const { results } = response.data;
//       if (results.length > 0) {
//         const { road, city, state } = results[0].components;
//         setFormData((prevFormData) => ({
//           ...prevFormData,
//           location: {
//             ...prevFormData.location,
//             address: road || "",
//             city: city || "",
//             state: state || "",
//           },
//         }));
//       }
//     } catch (error) {
//       console.error("Error fetching address:", error);
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
//               value={formData.location.coordinates.coordinates[0]} // Display latitude
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
//               value={formData.location.coordinates.coordinates[1]} // Display longitude
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
// import axios from "axios";

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
//       coordinates: {
//         type: "Point",
//         coordinates: [],
//       },
//     },
//   });

//   const { signup } = useProviderSignup();

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
//     await signup(formData);
//   };

//   const getLocation = async () => {
//     try {
//       const response = await axios.get(
//         "https://ipinfo.io/json?token=9f89fb7679b590"
//       );
//       const { loc, city, region } = response.data;
//       const [latitude, longitude] = loc.split(",");

//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         location: {
//           ...prevFormData.location,
//           coordinates: {
//             type: "Point",
//             coordinates: [parseFloat(longitude), parseFloat(latitude)],
//           },
//           city: city || "",
//           state: region || "",
//         },
//       }));

//       fetchAddress(latitude, longitude);
//     } catch (error) {
//       console.error("Error fetching location based on IP:", error);
//     }
//   };

//   const fetchAddress = async (latitude, longitude) => {
//     try {
//       const response = await axios.get(
//         `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=a02e2770e11748368699e21a1669f523`
//       );
//       const { results } = response.data;
//       if (results.length > 0) {
//         const { road } = results[0].components;
//         setFormData((prevFormData) => ({
//           ...prevFormData,
//           location: {
//             ...prevFormData.location,
//             address: road || "",
//           },
//         }));
//       }
//     } catch (error) {
//       console.error("Error fetching address:", error);
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
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
//               value={formData.location.coordinates.coordinates[0]} // Display latitude
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
//               value={formData.location.coordinates.coordinates[1]} // Display longitude
//               onChange={handleLocationChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               readOnly
//             />
//           </div>
//           <div className="mb-4">
//             <button
//               type="submit"
//               className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//             >
//               Sign Up
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ServiceProviderSignup;

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import useProviderSignup from "../../../hooks/provider/useProviderSignup";
import axios from "axios";

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
        coordinates: [0, 0], // Default coordinates
      },
    },
  });

  const [position, setPosition] = useState([0, 0]); // Default position

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

  const getLocation = async () => {
    try {
      const response = await axios.get(
        "https://ipinfo.io/json?token=9f89fb7679b590"
      );
      const { loc, city, region } = response.data;
      const [latitude, longitude] = loc.split(",");

      setPosition([parseFloat(latitude), parseFloat(longitude)]);

      setFormData((prevFormData) => ({
        ...prevFormData,
        location: {
          ...prevFormData.location,
          coordinates: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          city: city || "",
          state: region || "",
        },
      }));

      fetchAddress(latitude, longitude);
    } catch (error) {
      console.error("Error fetching location based on IP:", error);
    }
  };

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=a02e2770e11748368699e21a1669f523`
      );
      const { results } = response.data;
      if (results.length > 0) {
        const { road } = results[0].components;
        setFormData((prevFormData) => ({
          ...prevFormData,
          location: {
            ...prevFormData.location,
            address: road || "",
          },
        }));
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleMapClick = (e) => {
    setPosition([e.latlng.lat, e.latlng.lng]);
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        coordinates: {
          type: "Point",
          coordinates: [e.latlng.lng, e.latlng.lat],
        },
      },
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full m-4">
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
      <div style={{ height: "150px", width: "100" }}>
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          onClick={handleMapClick}
        >
          <TileLayer url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=HId27oeOObczc1z9RrUE" />
          <Marker position={position}>
            <Popup>Your location</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default ServiceProviderSignup;
