import React, { useState, useEffect } from "react";
import client from "../../../utils/client";
import {
  formatBytes,
  notifyError,
  notifySuccess,
} from "../../../utils/Helpers";
import { useSelector } from "react-redux";
import PayPalButton from "../../../components/User/Auth/Paypal_Button";

export default function Subscriptions() {
  const [userSubscription, setUserSubscription] = useState(null);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [totalSize, setTotalSize] = useState(0);
  const [showPayPal, setShowPayPal] = useState(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState(null);

  const user = useSelector((state) => state.user.user);

  const fetchTotalSize = async () => {
    try {
      const response = await client.post("/files/total-size/", {
        user_id: user.id,
      });
      setTotalSize(response.data.total_size);
    } catch (error) {
      notifyError("Failed to fetch total upload size");
      console.error(error.message);
    }
  };

  // Fetch subscription plans from API
  const fetchSubscriptionPlans = async () => {
    try {
      const response = await client.get("/subscriptions/subscription-plans/");
      setSubscriptionPlans(response.data);
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
      notifyError("Failed to load subscription plans");
    }
  };

  // Convert API plans to display format
  const getDisplayPlans = () => {
    if (!subscriptionPlans.length || !userSubscription) return [];

    return subscriptionPlans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      description:
        plan.tier === "free"
          ? "Best for personal use"
          : plan.tier === "pro"
          ? "For professionals and teams"
          : "For large teams & enterprises",
      price: `₱${plan.price}`,
      period: plan.tier === "free" ? "forever" : "per month",
      storage:
        plan.features.find((f) => f.includes("GB") || f.includes("TB")) ||
        `${plan.tier} Storage`,
      features: plan.features,
      popular: plan.tier === "pro", // Mark Pro as popular
      current: userSubscription.plan.id === plan.id, // Mark current plan based on user's subscription
    }));
  };

  // Helper functions
  const getStorageLimit = () => {
    if (!userSubscription) return "0 GB";

    const storageFeature = userSubscription.plan.features.find(
      (f) => f.includes("GB") || f.includes("TB") || f.includes("Storage")
    );

    if (storageFeature) {
      const match = storageFeature.match(/(\d+)\s*(GB|TB)/);
      if (match) {
        const number = parseInt(match[1]);
        const unit = match[2];
        return unit === "TB" ? `${number * 1024} GB` : `${number} GB`;
      }
    }
    return "Unlimited Storage";
  };

  const getStorageLimitInGB = () => {
    if (!userSubscription) return 0;

    const storageFeature = userSubscription.plan.features.find(
      (f) => f.includes("GB") || f.includes("TB") || f.includes("Storage")
    );

    if (storageFeature) {
      const match = storageFeature.match(/(\d+)\s*(GB|TB)/);
      if (match) {
        const number = parseInt(match[1]);
        const unit = match[2];
        return unit === "TB" ? number * 1024 : number;
      }
    }
    return 0;
  };

  const calculateStoragePercentage = () => {
    if (!userSubscription || !totalSize) return 0;

    const storageLimitGB = getStorageLimitInGB();
    if (storageLimitGB === 0) return 0;

    const totalSizeGB = totalSize / (1024 * 1024 * 1024);
    const percentage = (totalSizeGB / storageLimitGB) * 100;
    return Math.min(percentage, 100);
  };

  const getRemainingStorage = () => {
    const percentage = calculateStoragePercentage();
    if (percentage >= 100) return "No storage remaining";

    const storageLimitGB = getStorageLimitInGB();
    const totalSizeGB = totalSize / (1024 * 1024 * 1024);
    const remainingGB = storageLimitGB - totalSizeGB;

    return `${remainingGB.toFixed(1)} GB available`;
  };

  const getDaysUntilRenewal = () => {
    if (!userSubscription) return 0;

    const renewalDate = new Date(
      userSubscription.end_date || userSubscription.start_date
    );
    if (!userSubscription.end_date) {
      renewalDate.setDate(
        renewalDate.getDate() + userSubscription.plan.interval_days
      );
    }

    const today = new Date();
    const diffTime = renewalDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getRenewalDate = () => {
    if (!userSubscription) return new Date();

    if (userSubscription.end_date) {
      return new Date(userSubscription.end_date);
    } else {
      const renewalDate = new Date(userSubscription.start_date);
      renewalDate.setDate(
        renewalDate.getDate() + userSubscription.plan.interval_days
      );
      return renewalDate;
    }
  };

  // Fetch user subscription data
  const fetchUserSubscription = async () => {
    try {
      setLoading(true);

      const response = await client.get(
        "/subscriptions/subscriptions/current/",
        {
          params: {
            user_id: user.id,
          },
        }
      );

      setUserSubscription(response.data);
      setSelectedPlan(response.data.plan);
    } catch (error) {
      console.error("Error fetching subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  // New PayPal functions
  const handleUpgrade = (plan) => {
    if (plan.price === "₱0.00") {
      // Handle free plan (downgrade)
      handleFreeUpgrade(plan);
    } else {
      // Show PayPal for paid plans
      setSelectedPlanForPayment(plan);
      setShowPayPal(true);
    }
  };

  const handleFreeUpgrade = async (plan) => {
    try {
      const response = await client.post(
        "/subscriptions/subscriptions/downgrade/",
        {
          user_id: user.id,
        }
      );
      notifySuccess("Plan updated successfully!");
      fetchUserSubscription();
    } catch (error) {
      notifyError("Failed to update plan");
    }
  };

  const handlePaymentSuccess = (subscription) => {
    setShowPayPal(false);
    setSelectedPlanForPayment(null);
    fetchUserSubscription(); // Refresh data
  };

  useEffect(() => {
    fetchUserSubscription();
    fetchSubscriptionPlans();
    fetchTotalSize();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your subscription...</p>
          </div>
        </div>
      </div>
    );
  }

  const displayPlans = getDisplayPlans();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* PayPal Modal */}
      {showPayPal && selectedPlanForPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] flex flex-col">
            {" "}
            {/* Add max-h and flex-col */}
            {/* Header - fixed */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 flex-shrink-0">
              <h3 className="text-lg font-semibold">Complete Your Payment</h3>
              <button
                onClick={() => setShowPayPal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-6">
              {" "}
              {/* Add overflow-y-auto */}
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold">
                  {selectedPlanForPayment.name} Plan
                </h4>
                <p className="text-2xl font-bold text-blue-600">
                  {selectedPlanForPayment.price}
                </p>
              </div>
              <PayPalButton
                plan={selectedPlanForPayment}
                user={user}
                onSuccess={handlePaymentSuccess}
                onError={() => setShowPayPal(false)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free, and upgrade anytime for more power and storage. All
            plans include secure file storage and sharing.
          </p>
        </div>

        {/* Current Subscription Status */}
        {userSubscription && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Current Subscription
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Current Plan */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-blue-900">Current Plan</h3>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      userSubscription.plan.tier === "pro"
                        ? "bg-purple-100 text-purple-800"
                        : userSubscription.plan.tier === "business"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {userSubscription.plan.tier.toUpperCase()}
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {userSubscription.plan.name}
                  </h2>
                  <p className="text-3xl font-bold text-blue-600">
                    ₱{parseFloat(userSubscription.plan.price).toLocaleString()}
                    <span className="text-sm font-normal text-gray-600">
                      /month
                    </span>
                  </p>
                  <div className="pt-2">
                    <p className="text-sm text-gray-600">
                      Status:
                      <span
                        className={`ml-1 font-medium ${
                          userSubscription.status === "active"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {userSubscription.status.charAt(0).toUpperCase() +
                          userSubscription.status.slice(1)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Storage Usage */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Storage Usage
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {formatBytes(totalSize)} of {getStorageLimit()} used
                    </span>
                    <span className="font-semibold text-gray-900">
                      {calculateStoragePercentage().toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        calculateStoragePercentage() > 90
                          ? "bg-red-500"
                          : calculateStoragePercentage() > 70
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          calculateStoragePercentage(),
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {getRemainingStorage()}
                  </p>
                </div>
              </div>

              {/* Renewal Date */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                <h3 className="font-semibold text-green-900 mb-3">
                  Renewal Date
                </h3>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-700 mb-1">
                    {getRenewalDate().toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-green-600">
                    {getDaysUntilRenewal()} days remaining
                  </p>
                </div>
              </div>
            </div>

            {/* Plan Features */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                Plan Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {userSubscription.plan.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {displayPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border-2 ${
                plan.popular
                  ? "border-blue-500 bg-white shadow-lg scale-105"
                  : plan.current
                  ? "border-green-500 bg-white"
                  : "border-gray-200 bg-white"
              } p-8 transition-all duration-300 hover:shadow-xl`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Current Plan Badge */}
              {plan.current && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Current Plan
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>

                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period !== "forever" && (
                    <span className="text-gray-600">/{plan.period}</span>
                  )}
                </div>

                <div className="text-lg font-semibold text-blue-600 mb-2">
                  {plan.storage}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(plan)}
                disabled={plan.current}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  plan.current
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : plan.popular
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-900 hover:bg-gray-800 text-white"
                }`}
              >
                {plan.current
                  ? "Current Plan"
                  : plan.price === "₱0.00"
                  ? "Get Started"
                  : "Upgrade Now"}
              </button>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">
              Plan Comparison
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Features
                  </th>
                  {displayPlans.map((plan) => (
                    <th
                      key={plan.id}
                      className="px-6 py-4 text-center text-sm font-semibold text-gray-900"
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Storage
                  </td>
                  {displayPlans.map((plan) => (
                    <td
                      key={plan.id}
                      className="px-6 py-4 text-center text-sm text-gray-600"
                    >
                      {plan.storage}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Price
                  </td>
                  {displayPlans.map((plan) => (
                    <td
                      key={plan.id}
                      className="px-6 py-4 text-center text-sm text-gray-600"
                    >
                      {plan.price}
                      {plan.period !== "forever" && (
                        <span className="text-gray-500 text-xs">/month</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Support
                  </td>
                  {displayPlans.map((plan) => (
                    <td
                      key={plan.id}
                      className="px-6 py-4 text-center text-sm text-gray-600"
                    >
                      {plan.features.find((f) => f.includes("Support")) ||
                        "Basic"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Can I upgrade or downgrade at any time?
              </h3>
              <p className="text-gray-600">
                Yes, you can change your plan at any time. Upgrades take effect
                immediately, while downgrades apply at the end of your billing
                cycle.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Is there a free trial for paid plans?
              </h3>
              <p className="text-gray-600">
                All paid plans come with a 14-day free trial. No credit card
                required to start your trial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
