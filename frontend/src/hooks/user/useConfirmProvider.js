import { useState } from "react";
import toast from "react-hot-toast";

const useConfirmProvider = () => {
  const [loading, setLoading] = useState(false);

  const confirmProvider = async ({ confirmationId, providerId }) => {
    setLoading(true);

    // Validate input
    if (!handleInputErrors({ confirmationId, providerId })) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/v1/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confirmationId, providerId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      const data = await response.json();
      toast.success("Message sent successfully");
      return data; // Return the response data if needed
    } catch (error) {
      toast.error(error.message || "An error occurred while sending the message");
    } finally {
      setLoading(false);
    }
  };

  return { confirmProvider, loading };
};

// Function to handle input validation errors
function handleInputErrors({ confirmationId, providerId }) {
  if (!confirmationId) {
    toast.error("Confirmation ID is required");
    return false;
  }
  if (!providerId) {
    toast.error("Provider ID is required");
    return false;
  }
  
  return true;
}

export default useConfirmProvider;
