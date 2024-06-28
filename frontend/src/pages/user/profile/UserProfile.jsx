import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../../components/user/navbar/Navbar';
import Footer from '../../../components/user/footer/Footer';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('x-user');
        const response = await axios.get('/api/v1/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };

    fetchProfileData();
  }, []);

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
      const token = localStorage.getItem('x-user');
      const formData = new FormData();
      formData.append('name', profileData.name);
      formData.append('email', profileData.email);
      formData.append('phoneNumber', profileData.phoneNumber);
      formData.append('bio', profileData.bio);
      if (selectedFile) {
        formData.append('profilePicture', selectedFile);
      }

      await axios.put('/api/v1/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setEditMode(false);
      setSelectedFile(null);
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
      <Navbar />
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-48">
        <div className="container mx-auto flex items-end h-full px-4">
          <div className="w-32 h-32 relative">
            <img
              src={profileData.data.avatar?.url || 'https://via.placeholder.com/150x150'}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
            />
            {!editMode && (
              <label
                htmlFor="profilePicture"
                className="absolute bottom-0 right-0 bg-blue-500 text-white px-2 py-1 rounded-full cursor-pointer hover:bg-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 11a2.12 2.12 0 00-2.122 2.122v7.757a2.12 2.12 0 002.122 2.122h7.758a2.12 2.12 0 002.122-2.122v-7.758a2.12 2.12 0 00-2.122-2.122H5.121zM3.75 8.879V7.121a2.122 2.122 0 012.122-2.121h1.757M15.75 8.879V7.121a2.122 2.122 0 00-2.121-2.121h-1.758M9.293 12.707L12 9.293m0 0L14.707 12.707M12 9.293V16.5" />
                </svg>
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
        <div className="bg-white shadow-lg rounded-lg overflow-hidden dark:bg-gray-700 dark:text-white">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              {!editMode ? (
                <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{profileData.data.name}</h1>
              ) : (
                <input
                  type="text"
                  name="name"
                  value={profileData.data.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-600 dark:border-gray-500"
                />
              )}
              {!editMode && (
                <button
                  onClick={handleEditClick}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 shadow-md"
                >
                  Edit Profile
                </button>
              )}
            </div>
            {!editMode ? (
              <p className="text-gray-700 dark:text-gray-300">{profileData.data.bio || 'No bio available.'}</p>
            ) : (
              <textarea
                name="bio"
                value={profileData.data.bio || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-600 dark:border-gray-500"
              ></textarea>
            )}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-600 px-6 py-4">
            <ul className="grid grid-cols-2 gap-4">
              <li>
                <span className="font-bold">Email:</span> {!editMode ? profileData.data.email : (
                  <input
                    type="email"
                    name="email"
                    value={profileData.data.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-600 dark:border-gray-500"
                  />
                )}
              </li>
              <li>
                <span className="font-bold">Mobile:</span> {!editMode ? profileData.data.phoneNumber : (
                  <input
                    type="text"
                    name="phoneNumber"
                    value={profileData.data.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-600 dark:border-gray-500"
                  />
                )}
              </li>
              <li>
                <span className="font-bold">Address:</span> {profileData.data.location || 'No address available.'}
              </li>
            </ul>
          </div>
        </div>
        {editMode && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSaveClick}
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 shadow-md"
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

export default UserProfile;
