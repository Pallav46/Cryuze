import React from 'react';
import { useParams } from 'react-router-dom';
import useGetProvider from '../../../hooks/user/useGetProvider';
import { FaStar, FaStarHalfAlt, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Profile = () => {
  const { providerId } = useParams();
  const { data, loading, error } = useGetProvider(providerId);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage message={error.message} />;

  const { name, email, phoneNumber, address, rating, reviews } = data || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <img
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`}
              alt={`${name}'s avatar`}
              className="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-8 border-4 border-blue-500"
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{name}</h2>
              <div className="flex items-center mb-4">
                <StarRating rating={rating} />
                <span className="text-gray-600 ml-2 text-lg">{rating?.toFixed(1) || 'N/A'}</span>
              </div>
              <ContactInfo email={email} phoneNumber={phoneNumber} address={address} />
            </div>
          </div>
        </div>
        <ReviewSection reviews={reviews} />
      </div>
    </div>
  );
};

const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const fractionalPart = rating % 1;

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-yellow-400 w-6 h-6" />);
  }

  // Add fractional star
  if (fractionalPart > 0) {
    if (fractionalPart <= 0.25) {
      stars.push(<QuarterStar key="quarter" />);
    } else if (fractionalPart <= 0.5) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 w-6 h-6" />);
    } else if (fractionalPart <= 0.75) {
      stars.push(<ThreeQuarterStar key="three-quarter" />);
    } else {
      stars.push(<FaStar key="almost-full" className="text-yellow-400 w-6 h-6" />);
    }
  }

  // Add empty stars
  while (stars.length < 5) {
    stars.push(<EmptyStar key={`empty-${stars.length}`} />);
  }

  return <div className="flex">{stars}</div>;
};

const QuarterStar = () => (
  <div className="relative w-6 h-6">
    <EmptyStar />
    <div className="absolute top-0 left-0 w-1/4 h-full overflow-hidden">
      <FaStar className="text-yellow-400 w-6 h-6" />
    </div>
  </div>
);

const ThreeQuarterStar = () => (
  <div className="relative w-6 h-6">
    <EmptyStar />
    <div className="absolute top-0 left-0 w-3/4 h-full overflow-hidden">
      <FaStar className="text-yellow-400 w-6 h-6" />
    </div>
  </div>
);

const EmptyStar = () => (
  <FaStar className="text-gray-300 w-6 h-6" />
);

const ContactInfo = ({ email, phoneNumber, address }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <FaEnvelope className="text-blue-500 mr-2" />
        <span>{email}</span>
      </div>
      <div className="flex items-center">
        <FaPhone className="text-blue-500 mr-2" />
        <span>{phoneNumber}</span>
      </div>
      <div className="flex items-center">
        <FaMapMarkerAlt className="text-blue-500 mr-2" />
        <span>{address}</span>
      </div>
    </div>
  );
};

const ReviewSection = ({ reviews }) => {
  return (
    <div className="bg-gray-50 p-6">
      <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
      {reviews && reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center mb-2">
                <StarRating rating={review.rating} />
                <span className="ml-2 text-gray-600">{review.rating.toFixed(1)}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No reviews yet.</p>
      )}
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 md:mb-0 md:mr-8"></div>
            <div className="w-full">
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-6">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow">
                <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ErrorMessage = ({ message }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
        <p className="font-bold">Error</p>
        <p>{message || 'An unexpected error occurred. Please try again later.'}</p>
      </div>
    </div>
  );
};

export default Profile;