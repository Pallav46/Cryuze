// import React from 'react';
import { useParams } from "react-router-dom";
import useGetProvider from "../../../hooks/user/useGetProvider";

const Profile = () => {
  const { providerId } = useParams();
  const { data, loading, error } = useGetProvider(providerId);


  // Check if data is loading or if there's an error
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Check if data is null
  if (!data || !data.data) return <div>No data available</div>;

  const { name, email, phoneNumber, reviews } = data.data;

  // Calculate average rating
  const calculateAverageRating = () => {
    if (!reviews || reviews.length === 0) {
      return 0; // Return 0 if reviews are undefined or empty
    }

    const totalRating = reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    return totalRating / reviews.length;
  };

  // Render average rating
  const averageRating = calculateAverageRating();

  // Render profile content
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center">
          <img src={""} alt="Avatar" className="w-24 h-24 rounded-full mr-4" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
            <p className="text-gray-600">{email}</p>
            <p className="text-gray-600">{phoneNumber}</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500">
                {Array.from({ length: 5 }, (_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`w-5 h-5 ${
                      index < Math.floor(averageRating)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  >
                    <path d="M9.049 2.927a.9.9 0 011.902 0l.4 3.094a.9.9 0 00.612.74l3.119.52a.9.9 0 01.505 1.515l-2.216 2.155a.9.9 0 00-.252.774l.624 3.104a.9.9 0 01-1.31.95l-2.713-1.564a.9.9 0 00-.84 0l-2.713 1.564a.9.9 0 01-1.31-.95l.624-3.104a.9.9 0 00-.252-.774L2.88 8.796a.9.9 0 01.505-1.515l3.12-.52a.9.9 0 00.611-.74l.399-3.094z" />
                  </svg>
                ))}
              </span>
              <span className="text-gray-600 ml-2">
                {averageRating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
