import { useState, useEffect } from "react";
import Heading from "../../Heading";
import ProductCard from "./ProductCard";
import FixedCard from "./FixedCard";
import { useParams } from "react-router-dom";
import useGetService from "../../../hooks/useGetService";
import useUserNearby from "../../../hooks/user/useUserNearby";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Products() {
  const { id, subcatId } = useParams();
  const { data: serviceData } = useGetService(id);
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  useEffect(() => {
    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCoordinates({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  const { nearbyServiceProviders } = useUserNearby(
    id,
    subcatId,
    coordinates.lng,
    coordinates.lat
  );

  const serviceProviderIds = nearbyServiceProviders.map(
    (provider) => provider._id
  );

  const [isCardOpen, setIsCardOpen] = useState(false); // Initially closed
  const [setShowPopover] = useState(false);
  const [setSelectedProductId] = useState(null);
  const [setSelectedProductData] = useState(null);

  const toggleCard = () => {
    setIsCardOpen(!isCardOpen);
  };

  const handleSubCardClick = (id) => {
    const element = document.getElementById(`product-${id}`);
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleBuyNowClick = (productId, productData) => {
    setSelectedProductId(productId);
    setSelectedProductData(productData);
    setShowPopover(true);
  };

  return (
    <div className="flex">
      {serviceData && serviceData.data && (
        <FixedCard
          isOpen={isCardOpen}
          data={serviceData.data.subCategories}
          onSubCardClick={handleSubCardClick}
        />
      )}
      <button
        onClick={toggleCard}
        className={`fixed top-1/2 transform -translate-y-1/2 bg-blue-800 text-white p-2 rounded-full z-20 transition-transform duration-300 ${
          isCardOpen ? "left-64" : "left-4"
        }`}
      >
        {isCardOpen ? <FaArrowLeft /> : <FaArrowRight />}
      </button>
      <div
        className={`transition-all duration-300 flex-1 ${
          isCardOpen ? "ml-64" : "ml-0"
        }`}
      >
        <div className="container mx-auto">
          {serviceData && serviceData.data && (
            <Heading
              title={serviceData.data.name}
              subtitle={`Total provider: ${serviceProviderIds.length}`}
            />
          )}

          <div className="flex flex-col space-y-4">
            {serviceData &&
              serviceData.data &&
              serviceData.data.subCategories.map((product) => (
                <ProductCard
                  key={product.id}
                  data={product}
                  onBuyNowClick={() => handleBuyNowClick(product.id, product)}
                  serviceProviderIds={serviceProviderIds}
                />
              ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Products;
