import { useState } from "react";
import toast from "react-hot-toast";

const useSendNotification = () => {
  const [loading, setLoading] = useState(false);

  const sendNotification = async ({ serviceProviderIds, message, serviceId, subcatId }) => {
    setLoading(true);

    // Validate input
    // if (!handleInputErrors({ message })) {
    //   setLoading(false);
    //   return;
    // }

    try {
      const response = await fetch(`/api/v1/service/${serviceId}/buy/${subcatId}/send-notif`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serviceProviderIds, message }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send notification");
      }

      const data = await response.json();
      toast.success("Notification sent successfully");
      return data; // Return the response data if needed
    } catch (error) {
      toast.error(error.message || "An error occurred while sending the notification");
    } finally {
      setLoading(false);
    }
  };

  return { sendNotification, loading };
};

// Function to handle input validation errors
// function handleInputErrors({ message }) {
//   if (!message || typeof message !== 'string' || !message.trim()) {
//     toast.error("Message cannot be empty");
//     return false;
//   }
//   return true;
// }

export default useSendNotification;