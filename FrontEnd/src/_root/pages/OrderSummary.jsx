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
  
  const [isSameAddress, setIsSameAddress] = useState(false);  
  
  const [paymentOption, setPaymentOption] = useState('creditCard');

  const [addressDto, setAddressDto] = useState({
    shippingAddress: {
      fullName: '',
      addressLine: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    billingAddress: {
      fullName: '',
      addressLine: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  const handleInputChange = (e, addressType) => {
    const { name, value } = e.target;
    setAddressDto(prevState => ({
      ...prevState,
      [addressType]: {
        ...prevState[addressType],
        [name]: value
      }
    }));
  };


 
  const updateAddressWithOrderId = async (addressDto) => {
  
    try {
     
      const response = await apiClient.put(`/orders/updateAddress/${orderId}`, addressDto,{
        headers: {
          'Content-Type': 'application/json',
        },
      });
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

    console.log("address dto in react:::::"+addressDto);
    updateAddressWithOrderId(addressDto); 
    
  };

  
  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsSameAddress(checked);
    if (checked) {      
      setAddressDto(prevState => ({
        ...prevState,
        billingAddress: { ...prevState.shippingAddress }
      }));
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
          name="fullName"
          value={addressDto.shippingAddress.fullName}
          onChange={(e) => handleInputChange(e, 'shippingAddress')}
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="text"
          name="addressLine"
          value={addressDto.shippingAddress.addressLine}
          onChange={(e) => handleInputChange(e, 'shippingAddress')}
          placeholder="Address"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="text"
          name="city"
          value={addressDto.shippingAddress.city}
          onChange={(e) => handleInputChange(e, 'shippingAddress')}
          placeholder="City"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="text"
          name="state"
          value={addressDto.shippingAddress.state}
          onChange={(e) => handleInputChange(e, 'shippingAddress')}
          placeholder="State"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="text"
          name="zipCode"
          value={addressDto.shippingAddress.zipCode}
          onChange={(e) => handleInputChange(e, 'shippingAddress')}
          placeholder="ZIP Code"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="text"
          name="country"
          value={addressDto.shippingAddress.country}
          onChange={(e) => handleInputChange(e, 'shippingAddress')}
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
      name="fullName"
      value={addressDto.billingAddress.fullName}
      onChange={(e) => handleInputChange(e, 'billingAddress')}
      placeholder="Name"
      className="w-full p-2 border border-gray-300 rounded mb-4"
    />
    <input
      type="text"
      name="addressLine"
      value={addressDto.billingAddress.addressLine}
      onChange={(e) => handleInputChange(e, 'billingAddress')}
      placeholder="Address"
      className="w-full p-2 border border-gray-300 rounded mb-4"
    />
    <input
      type="text"
      name="city"
      value={addressDto.billingAddress.city}
      onChange={(e) => handleInputChange(e, 'billingAddress')}
      placeholder="City"
      className="w-full p-2 border border-gray-300 rounded mb-4"
    />
    <input
      type="text"
      name="state"
      value={addressDto.billingAddress.state}
      onChange={(e) => handleInputChange(e, 'billingAddress')}
      placeholder="State"
      className="w-full p-2 border border-gray-300 rounded mb-4"
    />
    <input
      type="text"
      name="zipCode"
      value={addressDto.billingAddress.zipCode}
      onChange={(e) => handleInputChange(e, 'billingAddress')}
      placeholder="Zip Code"
      className="w-full p-2 border border-gray-300 rounded mb-4"
    />

    <input
          type="text"
          name="country"
          value={addressDto.billingAddress.country}
          onChange={(e) => handleInputChange(e, 'billingAddress')}
          placeholder="Country"
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
          type="submit"
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
