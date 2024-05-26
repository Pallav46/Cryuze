import { useState } from "react";
import toast from "react-hot-toast";

const useProviderSendMessage = (customerId) => {
  const [loading, setLoading] = useState(false);

  const sendMessage = async ({ message }) => {
    setLoading(true);

    if (!handleInputErrors({ message })) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/v1/providers/send/${customerId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully");
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Send message error:", error);
      toast.error("Failed to send message. Please try again.");
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

export default useProviderSendMessage;
