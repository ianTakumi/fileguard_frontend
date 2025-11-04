// components/PayPalButton.js
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { notifyError, notifySuccess } from "../../../utils/Helpers";
import client from "../../../utils/client";

const PayPalButton = ({ plan, user, onSuccess, onError }) => {
  const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "PHP",
    intent: "capture",
  };

  const createOrder = async (data, actions) => {
    try {
      console.log("🔄 Creating order for plan:", plan.name);
      const response = await client.post("/subscriptions/create-payment/", {
        user_id: user.id,
        plan_id: plan.id,
      });

      console.log("✅ Order created:", response.data.payment_id);
      return response.data.payment_id;
    } catch (error) {
      console.error("❌ Order creation failed:", error);
      notifyError("Failed to create payment order");
      throw error;
    }
  };

  const onApprove = async (data, actions) => {
    try {
      console.log("🔄 Approving order:", data.orderID);
      const response = await client.post("/subscriptions/execute-payment/", {
        order_id: data.orderID,
        user_id: user.id,
        plan_id: plan.id,
      });

      console.log("✅ Payment approved");
      notifySuccess("Payment successful! Your plan has been upgraded.");
      onSuccess(response.data.subscription);
    } catch (error) {
      console.error("❌ Payment approval failed:", error);
      notifyError("Payment failed");
      onError(error);
    }
  };

  const onPayPalError = (err) => {
    console.error("❌ PayPal error:", err);
    notifyError("Payment was cancelled or failed");
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="w-full max-w-md mx-auto">
        {" "}
        {/* Adjust width here */}
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onPayPalError}
          style={{
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "paypal",
            height: 45, // Increase height
            tagline: false, // Remove tagline for more space
          }}
          forceReRender={[plan]} // Force re-render when plan changes
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
