import { useState } from "react";
import toast from "react-hot-toast";

const useProviderConfirmation = () => {
  const [loading, setLoading] = useState(false);

  const askForConfirmation = async ({ customerId, subcatId }) => {

    setLoading(true);
    try {
      const response = await fetch("/api/v1/providers/confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerId, subcatId }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

    } catch (error) {
      console.error("AskForConfirmation error:", error.message);
      toast.error("AskForConfirmation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { askForConfirmation, loading };
};

export default useProviderConfirmation;
