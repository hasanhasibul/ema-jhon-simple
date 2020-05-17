import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import images from '../../images/giphy.gif'

const Review = () => {
    const [cart,setCart] = useState([]);
    const [OrderPlace,setOrderPlace] = useState(false)
    const placeOrderHandler = ()=>{
        setCart([]);
        setOrderPlace(true);
        processOrder();
     
    }
    const removeHandler = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !==productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(()=>{
    //cart 
    const saveCart =  getDatabaseCart();
    const productKeys =  Object.keys(saveCart);
    const cartProduct = productKeys.map( key =>{
        const product = fakeData.find(pd => pd.key ===key);
        product.quantity = saveCart[key];
        return product ;
    });
    setCart(cartProduct)
    },[])
   let thankYou ; 
   if (OrderPlace ===  true) {
       thankYou = <img src={images} alt=""/>
   }
    return (
        <div className="shop-container">
            <div className="products-container">
           {
               cart.map(pd=> <ReviewItem removeHandler={removeHandler} product={pd}></ReviewItem>)
           }
           {
              thankYou
           }
        </div>
        <div className="cart-container">
            <Cart cart={cart}>
                <button  onClick = {placeOrderHandler} className="cart-button"> Place Order</button>    
             </Cart>
            
        </div>
        </div>
    );
};

export default Review;