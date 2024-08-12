import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import apiClient from '@/services/apiClient';
import { format } from 'date-fns';

const OrderDetails = () => {

    const { orderTrackingId } = useParams();
    const [orderDetails ,setOrderDetails] = useState([]);
    const [shippingAddress ,setShippingAddress] = useState([]);
    const [orderDate, setOrderDate] = useState([]);
    const [orderStatus, setOrderStatus] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);


   const fetchOrderDetails = async () => {
    try { 
        const [response1] = await Promise.all([
        apiClient.get(`orders/track/${orderTrackingId}`),        
      ]); 
      setShippingAddress(response1.data.addressDto.shippingAddress);
      setOrderDetails(response1.data.orderDto);
      const formattedDate = format(new Date(response1.data.orderDate), 'MM/dd/yyyy');
      setOrderDate(formattedDate);
      setOrderStatus(response1.data.status);
     } catch (error) {
      console.error('Error fetching the order details:', error);
    }
  };
  
  
    useEffect(() => {
        fetchOrderDetails();
        const calculateTotalPrice = () => {
          return orderDetails.reduce((total, orderDto) => {
            return total + (orderDto.price * orderDto.quantity);
          }, 0).toFixed(2); // Round to 2 decimal places
        };
    
        setTotalPrice(calculateTotalPrice());
    }, [orderDetails]);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-4">Order Details</h2>
        
        <div className="mb-4">
          <span className="font-bold">Order ID:  {orderTrackingId}</span> 
        </div>
        
        <div className="mb-4">
          <span className="font-bold">Order Date: {orderDate}</span> 
        </div>
        <div className="mb-4">
          <span className="font-bold">Order Status: {orderStatus}</span> 
        </div>
        
        <div className="mb-4">
          <h3 className="font-bold text-2xl">Items:</h3>
          <ul>
            {orderDetails.map((item) => (
              <li key={item.orderId} className="flex justify-between border-b border-white py-2">
                <span>{item.productName} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="font-bold text-2xl">
          <span>Total:</span> ${totalPrice}
        </div>
        
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Shipping Address:</h3>
          <div className="bg-white text-black border p-4 rounded-lg">
            <div>{shippingAddress.fullName}</div>
            <div>{shippingAddress.addressLine}</div>            
            <div>
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
            </div>
            <div>{shippingAddress.country}</div>
          </div>            
          </div>
        <div className="mt-4">
          <Link to="/" className="text-blue-200 hover:text-blue-100 underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
