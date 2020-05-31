import React from 'react';

const Cart = (props) => {
    
    const cart = props.cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        total = total + item.price * item.quantity;
       
    }
    
    return (
        <div>
            <h3>Order Summary</h3>
            <p>Items Order : {cart.length}</p>
            <p>item price : {total} </p>
           {
              props.children
           }
           
        </div>
    );
};

export default Cart;