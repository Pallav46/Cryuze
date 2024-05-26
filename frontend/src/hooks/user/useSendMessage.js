import { useState } from "react";
import toast from "react-hot-toast";

const useSendMessage = (providerId) => {
  const [loading, setLoading] = useState(false);

  const sendMessage = async ({ message }) => {
    setLoading(true);

    // Validate input
    if (!handleInputErrors({ message })) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/v1/send/${providerId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      // console.log(response);
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

  return { sendMessage, loading };
};

// Function to handle input validation errors
function handleInputErrors({ message }) {
  if (!message || typeof message !== 'string' || !message.trim()) {
    toast.error("Message cannot be empty");
    return false;
  }
  return true;
}

export default useSendMessage;
