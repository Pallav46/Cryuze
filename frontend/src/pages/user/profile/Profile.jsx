import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../../components/user/navbar/Navbar'; // Replace with your Navbar component path
import Footer from '../../../components/user/footer/Footer'; // Replace with your Footer component path

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    mobileNumber: '+1234567890',
    profilePicture: 'https://via.placeholder.com/150x150', // Placeholder URL
    coverPhoto: 'https://via.placeholder.com/800x200', // Placeholder URL
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum.',
    location: 'New York, USA',
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const token = localStorage.getItem('x-user'); // Assuming the token is stored in localStorage
//         const response = await axios.get('/api/v1/profile', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setProfileData(response.data);
//       } catch (error) {
//         setError(error.response?.data?.message || error.message);
//       }
//     };

//     fetchProfileData();
//   }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('x-user'); // Assuming the token is stored in localStorage
      const formData = new FormData();
      formData.append('name', profileData.name);
      formData.append('email', profileData.email);
      formData.append('mobileNumber', profileData.mobileNumber);
      formData.append('bio', profileData.bio);
      if (selectedFile) {
        formData.append('profilePicture', selectedFile);
      }

      // Make PUT request to update profile
      await axios.put('/api/v1/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update local state and close edit mode
      setEditMode(false);
      setSelectedFile(null);
      
      // Refresh the page
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-700">
      <Navbar />
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(${profileData.coverPhoto})`, height: '200px' }}
      >
        <div className="container mx-auto flex items-end h-full px-4">
          <div className="w-32 h-32 relative">
            <img
              src={profileData.profilePicture} // Use profileData.profilePicture here
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-white"
            />
            {!editMode && (
              <label
                htmlFor="profilePicture"
                className="absolute bottom-0 right-0 bg-blue-500 text-white px-2 py-1 rounded cursor-pointer hover:bg-blue-600"
              >
                Change
                <input
                  type="file"
                  id="profilePicture"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-6 mb-[10vh] px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden dark:bg-gray-600 dark:text-white">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              {!editMode ? (
                <h1 className="text-2xl font-bold">{profileData.name}</h1>
              ) : (
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
              )}
              {!editMode && (
                <button
                  onClick={handleEditClick}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              )}
            </div>
            {!editMode ? (
              <p className="text-gray-600 dark:text-slate-300">{profileData.bio}</p>
            ) : (
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              ></textarea>
            )}
          </div>
          <div className="border-t border-gray-200 px-6 py-4">
            <ul className="grid grid-cols-2 gap-4">
              <li>
                <span className="font-bold">Email:</span>{' '}
                {!editMode ? profileData.email : (
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                )}
              </li>
              <li>
                <span className="font-bold">Mobile:</span>{' '}
                {!editMode ? profileData.mobileNumber : (
                  <input
                    type="text"
                    name="mobileNumber"
                    value={profileData.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                )}
              </li>
              <li>
                <span className="font-bold">Address:</span> {profileData.location}
              </li>
            </ul>
          </div>
        </div>
        {editMode && (
          <div className="mt-4">
            <button
              onClick={handleSaveClick}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
