import React from 'react';
import { useForm } from "react-hook-form";
import './Shipping.css'
import { useAuthHook } from '../LogIn/UseAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipping = () => {
    

    const { register, handleSubmit, watch, errors } = useForm();
    
    const auth = useAuthHook();

    const onSubmit = data =>{
      //TODO: samad come back after payment
        console.log(data);
        const saveCart = getDatabaseCart();
        const orderDetails = {email : auth.user.email,cart : saveCart};
        fetch('http://localhost:4200/placeOrder',{
          method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(orderDetails)
        })
        .then(res=>res.json())
        .then(data=>{
          alert("successfully placed your order with order ID .." + data._id )
          processOrder();
        })
    }

    console.log(watch("example")); 
    
    
  return (
    
    <form  className="form" onSubmit={handleSubmit(onSubmit)}>
      
      
      <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="name" />
      {errors.name && <span>Name is required</span>}

      <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="email" />
      {errors.email && <span>Email is required</span>}

      <input name="country" ref={register({ required: true })}  placeholder="country"/>
      {errors.country && <span>Country is required</span>}

      
      <input type="submit" />

    </form>
  );
};

export default Shipping;