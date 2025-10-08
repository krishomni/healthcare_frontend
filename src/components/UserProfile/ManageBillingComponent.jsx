import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Payment from "../Payment";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { CircleArrowRight } from "lucide-react";

// Attach token to each axios request
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const backendUrl = import.meta.env.VITE_BACKEND_API;

const fetchBilling = async () => {
  const { data } = await axios.get(`${backendUrl}/user/subInfo`);
  return data;
};

export default function ManageBillingComponent() {
  const { user, refreshUser } = useContext(AuthContext);

  if (!user) return null;

  // If no subscription ID, check with backend once
  useEffect(() => {
    if (!user?._id) return;

    if (!user?.stripeSubscriptionId) {
      axios.get(`${backendUrl}/user/hasSubscription`).then((res) => {
        if (res.data?.hasSubscription) {
          refreshUser();
          console.log("user has sub, updated user, refreshed local user state");
        }
      });
    }
  }, [user?._id, user?.stripeSubscriptionId, refreshUser]);

  // Fetch billing info only if sub exists
  const { data, error, isLoading } = useQuery({
    queryKey: ["billing"],
    queryFn: fetchBilling,
    enabled: !!user?.stripeSubscriptionId,
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });

  //take user to manage subscription
  const handleManageSubscriptions = async () => {
    try {
      const response = await axios.post(`${backendUrl}/checkout/billing-session`);
      window.location.href = response.data.billingSessionUrl;
    } catch (err) {
      console.error("Failed to start billing session", err);
      toast.error("Error starting billing session");
    }
  };

  const plan_colors = {
    "Pro Plan": "bg-blue-900 text-cyan-200",

    "Basic Plan": "bg-blue-200 text-blue-600",
  };

  if (isLoading) return <p>Loading billing info...</p>;
  if (error) return <p>Something went wrong</p>;

  if (user?.stripeSubscriptionId && data) {
    const plan = data.subscription.items?.data[0]?.price?.product?.name;
    return (
      <div className="flex flex-col items-center gap-5 mx-auto my-[5vh]">
        <div>
          <h1 className="text-2xl font-semibold ">Subscription Information</h1>
        </div>
        <p className="font-semibold">Status: {data.subscription.status}</p>
        <p className="font-semibold">Auto Renews: {data.subscription.cancel_at_period_end ? "No" : "Yes"}</p>
        <p className="font-semibold">
          Plan: <span className={`${plan_colors?.[plan]} rounded-4xl px-4 py-2 text-gra`}> {plan}</span>
        </p>
        {/* button for managing subscriptions */}
        <div>
          <button
            className="flex flex-row gap-3 rounded-md my-2 px-6 py-3 font-semibold bg-blue-700 text-gray-100 md:bg-gray-200 md:text-blue-700 hover:bg-blue-600 hover:text-gray-100 cursor-pointer transition-colors"
            onClick={() => handleManageSubscriptions()}
          >
            Manage Subscription <CircleArrowRight />
          </button>
        </div>
      </div>
    );
  }

  // If no subscription show subscribe button
  return (
    <div>
      <Payment />
    </div>
  );
}
