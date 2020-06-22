import React from 'react';
import { useForm } from "react-hook-form";
import './Shipping.css'
import { useAuthHook } from '../LogIn/UseAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import {loadStripe} from '@stripe/stripe-js';
import { Elements} from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutFrom/CheckoutForm';
import { useState } from 'react';

const Shipping = () => {

  

  const { register, handleSubmit, errors } = useForm();
  const [shipInfoAdded,setShipInfoAdded] = useState(null);
  const [orderSuccessFul,setOrdersuccessful] = useState(null)
  const auth = useAuthHook();

  const stripePromise = loadStripe('pk_test_51GvUxmHspu8WL2jGr3e9tOUJoUOPAoe9ZDu7QuIcnvpRmKGqHaIDe44CRiyIQ1fXiCr3Z9TMiFmEo9dlsl3C70hM00TIi5qYyB');

  const onSubmit = data => {
    setShipInfoAdded(data);
    
  }
  const handlePlaceDatabaseOrder = (payment) =>{
 //TODO: samad come back after payment
 const saveCart = getDatabaseCart();
 const orderDetails = { email: auth.user.email, cart: saveCart, shipping: shipInfoAdded ,payment :payment };
 fetch('https://stark-taiga-02598.herokuapp.com/placeOrder', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(orderDetails)
 })
   .then(res => res.json())
   .then(data => {
    setOrdersuccessful(data._id);
    processOrder(null)
     // reset local cart
     // processOrder();
   })
  }
  return (

    <div className="container">
      <div className="row">
        <div className="col-md-6" style={{display: shipInfoAdded && 'none'}}>
          <h3>shipping address</h3>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="name" />
            {errors.name && <span>Name is required</span>}

            <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="email" />
            {errors.email && <span>Email is required</span>}

            <input name="country" ref={register({ required: true })} placeholder="country" />
            {errors.country && <span>Country is required</span>}
            <input type="submit" />

          </form>
        </div>
        <div className="col-md-6" style={{display: shipInfoAdded ? 'block' : 'none'}}>
          <h1>Billing address</h1>
          <Elements stripe={stripePromise}>
          <CheckoutForm handlePlaceDatabaseOrder={handlePlaceDatabaseOrder}></CheckoutForm>
        </Elements>
        {
          orderSuccessFul && 
          <div style={{padding:'40px'}}>
            <h3>Thank you for shopping with us</h3>
             <p>Your order id : {orderSuccessFul}</p>
          </div>
        }
        </div>
      </div>
    </div>
  );
};

export default Shipping;