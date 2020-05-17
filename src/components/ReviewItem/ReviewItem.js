import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    const {name,quantity,price,key} = props.product
    return (
        <div className="productsContainer">
            <h3> {name} </h3>
            <h5> Quantity : {quantity} </h5>
            <h6> Price : {price} </h6>
            <button onClick={()=>props.removeHandler(key)} className="cart-button" >Remove</button>
        </div>
    );
};

export default ReviewItem;