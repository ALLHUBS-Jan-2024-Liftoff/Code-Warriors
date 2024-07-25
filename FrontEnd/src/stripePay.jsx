import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Pcx12Rty9sYl5xFfNEDxtgAtfEV8Jv7Ic3dfzjDF9Hr7JyLTj80wwMDORP3uXjte8K8XGwhbM8MiOcBaRyOi29k00y7HqJ4sX');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const { error, paymentIntent } = await stripe.createPayment({
      amount: 1000, // amount in cents
      currency: 'usd',
      payment_method: elements.getElement(CardElement),
      confirm: true,
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else {
      setError(null);
      setSucceeded(true);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button disabled={processing || !stripe || !elements} type="submit">
        {processing ? 'Processing…' : 'Pay'}
      </button>
      {error && <div>{error}</div>}
      {succeeded && <div>Payment succeeded!</div>}
    </form>
  );
};

const App = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default App;