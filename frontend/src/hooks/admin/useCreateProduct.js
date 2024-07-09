import { useState } from "react";
import toast from "react-hot-toast";

const useCreateProduct = () => {
  const [loading, setLoading] = useState(false);

  const createProduct = async ({
    serviceName,
    description,
    category,
    priceRange,
    subCategories,
    image
  }) => {
    const success = handleInputErrors({
      serviceName,
      description,
      category,
      priceRange,
      subCategories
    });

    if (!success) return;

    setLoading(true);
    try {
      const response = await fetch("/api/v1/admin/service/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set Content-Type to application/json
        },
        body: JSON.stringify({
          name: serviceName,
          description,
          category,
          priceRange,
          subCategories,
          image: image ? await image.text() : null // Convert File to text if image is available
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("Service created successfully!");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { createProduct, loading };
};

export default useCreateProduct;

function handleInputErrors({
  serviceName,
  description,
  category,
  priceRange,
  subCategories
}) {
  if (!serviceName || !description || !category || !priceRange || !subCategories.length) {
    toast.error("Please fill in all required fields");
    return false;
  }

  if (subCategories.some(subCategory => !subCategory.name || !subCategory.price || !subCategory.description)) {
    toast.error("Please fill in all subcategory details");
    return false;
  }

  return true;
}
