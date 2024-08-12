import React, { useState,useEffect } from 'react';
import apiClient from '@/services/apiClient';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PaymentModel from './PaymentModel';

const OrderSummary = () => {

  const [isModelOpen, setIsModelOpen] = useState(false);

  const handleOpenModel = () => setIsModelOpen(true);
  const handleCloseModel = () => setIsModelOpen(false);
  const handlePaymentSuccess = () => setPaymentSuccess(true);

  const { orderId } = useParams();
  
  const [orderItems, setOrderItems] = useState([]);

  const navigate = useNavigate();

  const [total, setTotal] = useState(0);
  
  const [isSameAddress, setIsSameAddress] = useState(false); 

  const [paymentSuccess, setPaymentSuccess] = useState(false);
   

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
    },
    contacts: {
      email: '',
      phone: ''
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
 
  const handleSubmitOrder = async (e) => {
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


const calculateTotalPrice = () => {
  return orderItems.reduce((total, orderItems) => {
    return total + (orderItems.price * orderItems.quantity);
  }, 0).toFixed(2); // Round to 2 decimal places
};


useEffect(() => { 

  fetchOrderItems();  
  setTotal(calculateTotalPrice());
  
},[orderItems]);



  return (
    <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% max-w-4xl mx-auto p-6 border bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <div className="mb-6">
        <table className=" bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Item No</th>
              <th className="py-2 px-4 border-b">Item Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Total</th>
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
              <td colSpan="4" className="border-b text-right font-bold">Total : </td>
              <td className="border-b font-bold">${total}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <form onSubmit={handleSubmitOrder}> 
        <h3 className="text-xl font-bold mb-2">Contact Information</h3>
        <div>
        
        <input
          type="email"
          name="email"
          value={addressDto.contacts.email}
          onChange={(e) => handleInputChange(e, 'contacts')}
          placeholder= "Email"
          className="w-full p-2 border border-gray-300 rounded mb-4" 
          required
        />
      </div>
      <div>        
        <input
          type="tel"
          name="phone"
          value={addressDto.contacts.phone}         
          onChange={(e) => handleInputChange(e, 'contacts')}
          placeholder="(123) 456-7890"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
      </div>

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
        
      </form>
      <div className="max-w-4xl mx-auto p-6 border bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Stripe Payment Option</h1>
            <div className="mt-6">
                <button
                    type="button"
                    onClick={handleOpenModel}
                    className="px-4 py-2 text-white font-semibold rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 transition-colors"
                >
                    Pay
                </button>
            </div>
            {isModelOpen && (
                <PaymentModel onClose={handleCloseModel} 
                onSuccess={handlePaymentSuccess}
                amount={total}
                />
                
            )}
            <div className="mt-6">
              
                <button
                    type="button"
                    disabled={!paymentSuccess}
                    className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md transition-colors ${
                        paymentSuccess
                            ? 'bg-blue-500 hover:bg-blue-600'
                            : 'bg-gray-300 cursor-not-allowed'
                    }`}
                    onClick={handleSubmitOrder}
                >
                    Submit Order
                </button>
            </div>
        </div>
    </div>
  );
};

export default OrderSummary;
