import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import apiClient from '@/services/apiClient';


const stripePromise = loadStripe('pk_test_51PZlxZBrshT9nmy8PLGjy8kQ7fOFb2LsYSXIPT9wxenEK4uhenHxbFfhHQrnYg1F9dJLbv0AcsgdA7Ad3kHpo3R00043Fd4Pmn');

const PaymentModel = ({ onClose, onSuccess, amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');    

    React.useEffect(() => {

        const longValue = Math.round(amount);

         apiClient.post('/api/payment/create-payment-intent', {            
                amount: longValue,  
                currency: 'usd',
                paymentMethod: 'card' 
            
         }) 
            .then(res => {
                setClientSecret(res.data.clientSecret);
            })
            .catch(error => console.log(error));
    }, []);


    const handleSubmit = async (event) => {        
        event.preventDefault(); 
        setProcessing(true);

        
        if (!stripe || !elements) {
            console.log("Stripe.js has not loaded yet.");
            return;
        }

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            }
        });


        if (payload.error) {
            setError(error.message);
            setProcessing(false);
        } else {  
            setProcessing(false);
            onSuccess();          
            alert('Payment successful!');
            onClose(); // Close the model after payment
           
        }
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Enter Card Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <button
                        type="submit"
                        disabled={!stripe || processing}
                        className={`w-full px-4 py-2 text-white font-semibold rounded-lg shadow-md transition-colors ${
                            stripe && !processing
                                ? 'bg-blue-500 hover:bg-blue-600'
                                : 'bg-gray-300 cursor-not-allowed'
                        }`}
                    >
                        {processing ? 'Processing…' : 'Pay'}
                    </button>
                </form>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                    Close
                </button>
            </div>
        </div>,
        document.body
    );
};

const PaymentModelWrapper = (props) => (
    <Elements stripe={stripePromise}>
        <PaymentModel {...props} />
    </Elements>
);

export default PaymentModelWrapper;
