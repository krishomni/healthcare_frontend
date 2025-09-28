// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";
// import Payment from "../Payment";
// import { useContext } from "react";

// const fetchBilling = async () => {
//   const { data } = await axios.get("/user/subInfo");
//   return data;
// };

// //attach token to each axios request
// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// const backendUrl = import.meta.env.VITE_BACKEND_API;
// export default async function ManageBillingComponent() {
//   const { user, refreshUser } = useContext(AuthContext);

//   //check if subscription id is in subscriptions collection
//   if (!user.stripeSubscriptionId) {
//     const res = await axios.get(`backendUrl/user/hasSubscription`);
//     if (res.hasSubscription) {
//       refreshUser();
//       console.log("user has sub, updated user, refreshed local user state");
//     }
//   }

//   //check if user has a subscription
//   if (user.stripeSubscriptionId) {
//     console.log("user has sub, no refresh");
//     //fetch data with useQuery so data is cached and
//     // does not make api call every time tab switches to Manage Bill
//     const { data, error, isLoading } = useQuery({
//       queryKey: ["billing"], // cache key
//       queryFn: fetchBilling,
//       staleTime: 1000 * 60 * 10, // 10 min, interval between data refresh
//       cacheTime: 1000 * 60 * 30, // 60 min, how long it will be kept in cache
//     });

//     if (isLoading) return <p>Loading billing info...</p>;
//     if (error) return <p>Something went wrong</p>;

//     return (
//       <div>
//         <h2>Your Subscription</h2>
//         <p>Status: {data.status}</p>
//         <p>Renews: {new Date(data.current_period_end * 1000).toLocaleDateString()}</p>
//         <p>Plan: {data.items?.data[0]?.price?.nickname}</p>
//       </div>
//     );
//   }

//   //if no subscription show subscribe button
//   return (
//     <div>
//       <Payment />
//     </div>
//   );
// }

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Payment from "../Payment";
import { useContext, useEffect } from "react";

//attach token to each axios request
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

  // If no subscription ID, check with backend once
  useEffect(() => {
    if (!user.stripeSubscriptionId) {
      axios.get(`${backendUrl}/user/hasSubscription`).then((res) => {
        if (res.data?.hasSubscription) {
          refreshUser();
          console.log("user has sub, updated user, refreshed local user state");
        }
      });
    }
  }, [user.stripeSubscriptionId, refreshUser]);

  // If user already has subscription, fetch billing info with react-query
  const { data, error, isLoading } = useQuery({
    queryKey: ["billing"],
    queryFn: fetchBilling,
    enabled: !!user.stripeSubscriptionId, // only run if subscription exists
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });

  console.log("data-----------------------", data);

  if (isLoading) return <p>Loading billing info...</p>;
  if (error) return <p>Something went wrong</p>;

  if (user.stripeSubscriptionId && data) {
    return (
      <div>
        <h2>Your Subscription</h2>
        <p>Status: {data.subscription.status}</p>
        <p>Auto Renews: {data.subscription.cancel_at_period_end ? "No" : "Yes"}</p>
        <p>Plan: {data.subscription.items?.data[0]?.price?.product?.name}</p>
      </div>
    );
  }
  //TODO:
  //show button to take user to stripe billing portal

  // If no subscription show subscribe button
  return (
    <div>
      <Payment />
    </div>
  );
}
