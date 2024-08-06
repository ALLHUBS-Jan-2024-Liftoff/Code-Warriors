import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import apiClient from '@/services/apiClient';


const OrderConfirmation = () => {
    const { orderId } = useParams();

    const [orderTrackingId, setOrderTrackingId] = useState(0);   

     const fetchOrderTracking = async () => {
      try { 
          const [response1] = await Promise.all([
            apiClient.get(`orders/${orderId}`),
          ]);
          
           const trackingId = response1.data.map(item => item.orderId);           
           setOrderTrackingId(trackingId[0]);           
                 
       } catch (error) {
        console.error('Error fetching the order details:', error);
      }
    };


    useEffect(() => {
          fetchOrderTracking();
      }, []);


   
  return (
    <div className="max-w-md mx-auto bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white shadow-lg rounded-lg p-6">
      <div className="relative py-3 w-11/12 max-w-xl sm:w-full sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-lg"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-lg sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Order Confirmed! Tracking Id: {orderTrackingId}</h1>
              <p className="mt-2 text-gray-600">Thank you for your purchase!! Your order has been successfully placed.</p>
              
              <div className="mt-6">
                <a href="/" className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center">
                  Back to Home
                </a>
              </div>
              <div className="mt-6">
                <Link to={`/order-details/${orderTrackingId}`} className="text-blue-500 hover:text-blue-700 font-medium text-sm">
                        View Order Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
