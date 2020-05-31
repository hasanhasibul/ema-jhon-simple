import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import images from '../../images/giphy.gif'
import { Link } from 'react-router-dom';
import { useAuthHook } from '../LogIn/UseAuth';

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
   const auth = useAuthHook();
    return (
        <div className="shop-container">
            <div className="products-container">
           {
               cart.map(pd=> <ReviewItem removeHandler={removeHandler} product={pd}></ReviewItem>)
           }
           {
              thankYou
           }
           {
               !cart.length && <h1 className="" >The cart is empty, <a href="/shop">go to shop</a></h1>
           }
        </div>
        <div className="cart-container">
            <Cart cart={cart}>
               <Link to="/shipping">
                {  auth.user ?
                    <button className="cart-button"> Proceed To Check Out </button>
                    :
                    <button className="cart-button">Log in to proceed </button>
                }
               </Link>    
             </Cart>
            
        </div>
        </div>
    );
};

export default Review;