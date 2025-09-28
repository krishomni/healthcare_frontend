import React, { useState } from 'react';
import axios from 'axios';

//attach token to each axios request
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const plans = [
  {
    id: 'free',
    name: 'Free Tier',
    price: '$0',
    period: '/month',
    description: 'Get started with essential features at no cost.',
    features: ['1 project', 'Basic analytics', 'Community support', 'Standard templates'],
    promo: false,
  },
  {
    id: 'basic',
    name: 'Basic Plan',
    price: '$10',
    period: '/month',
    regPrice: '$50',
    description: 'Perfect for individuals and businesses getting started',
    features: ['Up to 5 projects', 'Basic analytics', 'Email support', 'Standard templates'],
    promo: true,
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: '$20',
    period: '/month',
    regPrice: '$99',
    description: 'Best for growing individuals and businesses',
    features: ['Unlimited projects', 'Advanced analytics', 'Priority support', 'Premium templates', 'Custom integrations'],
    promo: true,
    popular: true,
  },
];

const backendUrl = import.meta.env.VITE_BACKEND_API;
const handleCheckout = async (planID) => {
  if (planID === 'free') {
    alert('You have selected the Free Tier. No payment required!');
    return;
  }
  try {
    const response = await axios.post(`${backendUrl}/checkout/checkout-session`, {
      plan: planID,
    });
    window.location.href = response.data.checkoutUrl;
  } catch (err) {
    console.error('Failed to start checkout', err);
    alert('Error starting checkout');
  }
};

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState('basic');

  const plan = plans.find((p) => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7faff] to-[#f3f6fb] flex flex-col items-center justify-start py-12 px-2">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 text-center mb-3">Choose Your Plan</h1>
      <p className="text-base md:text-lg text-gray-500 text-center mb-7">Select the perfect subscription tier for your needs. Upgrade or downgrade at any time.</p>
      <div className="bg-white rounded-xl shadow border border-gray-200 w-full max-w-md p-6 flex flex-col items-center justify-between relative transition-all duration-200 mb-8">
        {/* Plan toggle */}
        <div className="flex w-full justify-center gap-2 mb-6">
          {plans.map((p) => (
            <button key={p.id} className={`px-4 py-2 rounded-md font-semibold text-sm transition-all ${selectedPlan === p.id ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-blue-50'}`} onClick={() => setSelectedPlan(p.id)}>
              {p.name}
            </button>
          ))}
        </div>
        {/* Promo badge */}
        {plan.promo && (
          <span className="px-2 py-0.5 rounded bg-pink-600 text-white text-[11px] font-semibold shadow absolute -top-4 left-1/2 -translate-x-1/2" style={{ zIndex: 1 }}>
            Promo! Offer ends 12/31/2025
          </span>
        )}
        {/* Plan details */}
        <div className="text-base font-medium text-gray-700 mb-1 mt-2">{plan.name}</div>
        <div className="text-3xl font-bold text-gray-900 mb-0.5 flex items-center gap-2">
          {plan.promo && <span className="text-base font-normal line-through text-gray-400 mr-2">{plan.regPrice}</span>}
          {plan.price}
          <span className="text-base font-normal">{plan.period}</span>
        </div>
        <div className="text-gray-500 text-center mb-3 text-sm">{plan.description}</div>
        <ul className="mb-4 w-full text-gray-700 text-left space-y-1 text-sm flex-1">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <span className="text-green-500 text-base">&#10003;</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="w-full flex items-end">
          <button className={`w-full border rounded-md py-1.5 font-semibold transition-all duration-200 text-sm shadow-sm ${plan.id === 'free' ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50' : 'border-blue-600 text-white bg-blue-600 hover:bg-blue-700'}`} onClick={() => handleCheckout(plan.id)}>
            {plan.id === 'free' ? 'Select Free Tier' : 'Select Plan'}
          </button>
        </div>
        {plan.promo && (
          <div className="text-xs text-pink-600 mt-2 font-medium text-center">
            Regular price <span className="line-through">{plan.regPrice}</span> now <span className="font-bold">{plan.price}</span>! Offer ends 12/31/2025.
          </div>
        )}
      </div>
      <div className="bg-white rounded-2xl shadow border border-gray-100 w-full max-w-2xl mx-auto p-6 mt-2 flex flex-col items-center">
        <div className="text-blue-600 font-semibold text-center mb-4 text-base">Why Choose Us?</div>
        <div className="w-full flex flex-col md:flex-row items-center md:items-center justify-between gap-6">
          <div className="text-gray-700 text-left md:text-center text-sm flex-1 w-full">Secure payments powered by Stripe</div>
          <div className="text-gray-700 text-left md:text-center text-sm flex-1 w-full">Cancel anytime, no questions asked</div>
          <div className="text-gray-700 text-left md:text-center text-sm flex-1 w-full">Instant activation upon payment</div>
        </div>
      </div>
    </div>
  );
}
