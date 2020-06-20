import React from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = (props) => {
  const [paymentError,setPaymentError]= useState(null);
  const [paymentSuccess,setPaymentSuccess] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if(error){
      setPaymentError(error.message)
     setPaymentSuccess(null)
    }
    else{
      setPaymentSuccess(paymentMethod);
      const payment  = {id: paymentMethod.id, last4 : paymentMethod.card.last4}
      props.handlePlaceDatabaseOrder(payment);
      setPaymentError(null)
    }
    // console.log("stripe integrated",error,paymentMethod)
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {
        paymentError && <p class="text-danger">{paymentError}</p>
      }
      {
        paymentSuccess && <p class="text-success">payment successful</p>
      }
    </form>
    
  );
};
export default CheckoutForm;