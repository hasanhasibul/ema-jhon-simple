import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Products.css'

const Products = (props) => {
    // console.log(props.product)
    const {img,name,price,seller,stock,} = props.product;
    return (
        <div className="product">
            <div className="img-block">
                <img src={img} alt=""/>
            </div>
            <div className="product-block">
            <h4>{name}</h4>
            <p>by: {seller}</p>
            <h3> ${price}</h3>
            <p>only {stock} left in stock - order soon</p>
            <button onClick={()=>props.handleAddButton(props.product)} className="cart-button"><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
           </div>
        </div>
    );
};

export default Products;