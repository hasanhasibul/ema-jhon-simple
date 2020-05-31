import React from 'react';
import { useForm } from "react-hook-form";
import './Shipping.css'
import { useAuthHook } from '../LogIn/UseAuth';

const Shipping = () => {
    

    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = data =>{
        console.log(data);
    }
    console.log(watch("example")); 
    const auth = useAuthHook();
    
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