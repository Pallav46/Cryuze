import { useState } from "react";
import toast from "react-hot-toast";

const useSendBill = () => {
  const [loading, setLoading] = useState(false);

  const sendBill = async ({ serviceRequestId, subcategoryCharge, serviceCharge, additionalCharges }) => {
    // setLoading(true);
    console.log({ serviceRequestId, subcategoryCharge, serviceCharge, additionalCharges });
    try {
      const response = await fetch("/api/v1/providers/sendBill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serviceRequestId, subcategoryCharge, serviceCharge, additionalCharges }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Bill sent successfully");
      } else {
        throw new Error(data.error || "Failed to send bill");
      }
    } catch (error) {
      console.error("Sending bill error:", error);
      toast.error(error.message || "Failed to send bill. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { sendBill, loading };
};

export default useSendBill;
