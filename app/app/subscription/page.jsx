"use client"
import React, { useEffect, useState } from 'react';

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Function to fetch subscription plan details
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const subscriptionTypes = ['Free', 'Silver', 'Gold']; // Subscription types
        const fetchedPlans = [];

        for (const type of subscriptionTypes) {
          const response = await fetch(`${apiBaseUrl}/purchase/subscriptions/details/${type}`, {
            method: 'GET', // Change the method to GET
            headers: {
              'Content-Type': 'application/json',
            },
          });

          // Check if the response is OK (status code 200)
          if (!response.ok) {
            throw new Error(`Failed to fetch subscription plan details: ${response.statusText}`);
          }

          // Check if the response content type is JSON
          const contentType = response.headers.get('Content-Type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Received non-JSON response');
          }

          // Parse the JSON response
          const data = await response.json();

          // Check for success in the response data
          if (!data.success) {
            throw new Error('Failed to fetch subscription plans');
          }

          fetchedPlans.push(data.subPlanDetails);
        }

        setPlans(fetchedPlans);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    // Skeleton loading UI
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-16">Choose Your Plan</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Skeleton loader for Free plan */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center border border-gray-200 animate-pulse">
              <div className="bg-gray-300 h-8 w-3/4 mx-auto mb-4"></div>
              <div className="bg-gray-200 h-6 w-1/2 mx-auto mb-4"></div>
              <div className="bg-gray-200 h-4 w-3/4 mx-auto mb-4"></div>
              <div className="bg-gray-200 h-4 w-3/4 mx-auto mb-4"></div>
            </div>
            {/* Skeleton loader for Silver plan */}
            <div className="p-6 rounded-lg shadow-lg text-center border border-gray-200 bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse">
              <div className="bg-gray-300 h-8 w-3/4 mx-auto mb-4"></div>
              <div className="bg-gray-200 h-6 w-1/2 mx-auto mb-4"></div>
              <div className="bg-gray-200 h-4 w-3/4 mx-auto mb-4"></div>
              <div className="bg-gray-200 h-4 w-3/4 mx-auto mb-4"></div>
            </div>
            {/* Skeleton loader for Gold plan */}
            <div className="p-6 rounded-lg shadow-lg text-center border border-gray-200 bg-gradient-to-r from-yellow-100 to-yellow-300 animate-pulse">
              <div className="bg-gray-300 h-8 w-3/4 mx-auto mb-4"></div>
              <div className="bg-gray-200 h-6 w-1/2 mx-auto mb-4"></div>
              <div className="bg-gray-200 h-4 w-3/4 mx-auto mb-4"></div>
              <div className="bg-gray-200 h-4 w-3/4 mx-auto mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-h-screen  bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-16">Choose Your Plan</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div key={index} className={`py-14 px-3 rounded-lg shadow-lg text-center border border-gray-200 ${plan.name === 'Free' ? 'bg-white' : plan.name === 'Silver' ? 'bg-gradient-to-r from-gray-100 to-gray-300' : 'bg-gradient-to-r from-yellow-100 to-yellow-300'}`}>
              <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
              <p className="text-gray-600 mb-4">{plan.price === 0 ? "₹ 0/month" : `₹ ${plan.price}/month`}</p>
              <ul className="mb-6">
                {plan.benefits.map((benefit, index) => (
                  <li key={index} className="mb-2">{benefit}</li>
                ))}
              </ul>
              
              <button
  className={`   ${plan.name === 'Free' ? 'bg-gray-300 cursor-not-allowed' : plan.name === 'Silver' ? 'button-primary backprim' : 'button-primary backprim'} text-white px-6 py-2 rounded-md hover:bg-opacity-80 transition duration-300`}
  disabled={plan.name === 'Free'}
>
{plan.name === 'Free' ? 'Free Plan' : 'Select Plan'}
</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
