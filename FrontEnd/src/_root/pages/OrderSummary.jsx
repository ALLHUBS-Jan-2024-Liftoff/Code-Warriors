import React, { useState,useEffect } from 'react';
import apiClient from '@/services/apiClient';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('your-publishable-key-here'); // Replace with Stripe publishable key

const OrderSummary = () => {

  const { orderId } = useParams();
  
  const [orderItems, setOrderItems] = useState([]);

  const navigate = useNavigate();

  const [total, setTotal] = useState([]);

   const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const [billingAddress, setBillingAddress] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const [isSameAddress, setIsSameAddress] = useState(false);
  

  const [paymentOption, setPaymentOption] = useState('creditCard');

  const handleShippingAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBillingAddressChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleSubmitOrder = (shippingAddress)=>{
    const addressDto = {
    fullName: shippingAddress.name,
    addressLine:shippingAddress.address,
    city:shippingAddress.city,
    state:shippingAddress.state,
    zipCode:shippingAddress.zip,
    country:shippingAddress.country
    };
    updateAddressWithOrderId(addressDto);
   
  };

  const updateAddressWithOrderId = async (addressDto) => {
  
    try {
     
      const response = await apiClient.put(`/orders/updateAddress/${orderId}`, addressDto)
      navigate(`/order-confirmation/${orderId}`);
      
          
    } catch (error) {
      console.error('Error updating address:', error);
    }
   
  };
  const handlePaymentChange = (e) => {
    setPaymentOption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    
    console.log('Shipping Address:', shippingAddress);
    console.log('Payment Option:', paymentOption);
  };
  const handleInputChange = (e, setAddress) => {
    const { name, value } = e.target;
    setAddress(prevState => ({ ...prevState, [name]: value }));
  };
  
  const handleCheckboxChange = () => {
    setIsSameAddress(prevState => !prevState);
    if (!isSameAddress) {
      setBillingAddress({ ...shippingAddress });
    }
  };
  
const fetchOrderItems = async () => {
  
  try {
    const [response1] = await Promise.all([
      apiClient.get(`orders/${orderId}`), 
    ]);     
    
    setOrderItems(response1.data); 
    
  } catch (error) {
    console.error('Error fetching the products:', error);
  }
 
};

useEffect(() => {
  const calculateTotalPrice = () => {
    return orderItems.reduce((total, orderItems) => {
      return total + (orderItems.price * orderItems.quantity);
    }, 0).toFixed(2); // Round to 2 decimal places
  };

  setTotal(calculateTotalPrice());
}, [orderItems]);


useEffect(() => {
  fetchOrderItems();
}, [])

  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <div className="mb-6">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="border-b">Item No</th>
              <th className="border-b">Item Name</th>
              <th className="border-b">Price</th>
              <th className="border-b">Quantity</th>
              <th className="border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{index+1}</td>
                <td className="py-2 px-4 border-b">{item.productName}</td>
                <td className="py-2 px-4 border-b">${item.price.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{item.quantity}</td>
                <td className="py-2 px-4 border-b">${(item.price.toFixed(2) * item.quantity)}</td>
                
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="border-b text-right font-bold">Total : </td>
              <td className="border-b font-bold">${total}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <form onSubmit={handleSubmit}>       
        <h3 className="text-xl font-bold mb-2">Shipping Address</h3>
        <input
          type="text"
          name="name"
          value={shippingAddress.name}
          onChange={handleShippingAddressChange}
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="text"
          name="address"
          value={shippingAddress.address}
          onChange={handleShippingAddressChange}
          placeholder="Address"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="text"
          name="city"
          value={shippingAddress.city}
          onChange={handleShippingAddressChange}
          placeholder="City"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="text"
          name="state"
          value={shippingAddress.state}
          onChange={handleShippingAddressChange}
          placeholder="State"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="text"
          name="zip"
          value={shippingAddress.zip}
          onChange={handleShippingAddressChange}
          placeholder="ZIP Code"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="text"
          name="country"
          value={shippingAddress.country}
          onChange={handleShippingAddressChange}
          placeholder="Country"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />

<h2 className="text-xl font-bold mb-2">Billing Address</h2>
    <input
      type="checkbox"
      checked={isSameAddress}
      onChange={handleCheckboxChange}
    />

<label className="text-xl font-semibold mb-2">  Billing address same as shipping address</label>

{!isSameAddress && (
  <>
    <input
      type="text"
      name="name"
      value={billingAddress.name}
      onChange={handleBillingAddressChange}
      placeholder="Name"
      className="w-full p-2 border border-gray-300 rounded mb-4"
    />
    <input
      type="text"
      name="address"
      value={billingAddress.address}
      onChange={handleBillingAddressChange}
      placeholder="Address"
      className="w-full p-2 border border-gray-300 rounded mb-4"
    />
    <input
      type="text"
      name="city"
      value={billingAddress.city}
      onChange={handleBillingAddressChange}
      placeholder="City"
      className="w-full p-2 border border-gray-300 rounded mb-4"
    />
    <input
      type="text"
      name="state"
      value={billingAddress.state}
      onChange={handleBillingAddressChange}
      placeholder="State"
      className="w-full p-2 border border-gray-300 rounded mb-4"
    />
    <input
      type="text"
      name="zip"
      value={billingAddress.zip}
      onChange={handleBillingAddressChange}
      placeholder="Zip Code"
      className="w-full p-2 border border-gray-300 rounded mb-4"
    />
  </>
)}

        <h3 className="text-xl font-semibold mb-2">Payment Options</h3>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="paymentOption"
              value="creditCard"
              checked={paymentOption === 'creditCard'}
              onChange={handlePaymentChange}
              className="form-radio"
            />
            <span className="ml-2">Credit Card</span>
          </label>
        </div>
        {paymentOption === 'creditCard' && (
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="paymentOption"
              value="paypal"
              checked={paymentOption === 'paypal'}
              onChange={handlePaymentChange}
              className="form-radio"
            />
            <span className="ml-2">PayPal</span>
          </label>
        </div>
        <button
          type="submit" onClick={()=>handleSubmitOrder(shippingAddress)}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log(paymentMethod);
      // Process the payment
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="p-2 border border-gray-300 rounded mb-4" />
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-700"
      >
        Pay
      </button>
    </form>
  );
};

export default OrderSummary;
