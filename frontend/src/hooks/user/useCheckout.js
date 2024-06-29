import { useState } from "react";
import toast from "react-hot-toast";

const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  const checkout = async ({ amount }) => {
    setLoading(true);

    try {
      const response = await fetch("/api/v1/pay/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setCheckoutData(data); // Store the data from the checkout response

      toast.success("Checkout Successful");
      // Handle any additional logic after successful checkout
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { checkout, loading, checkoutData };
};

export default useCheckout;
