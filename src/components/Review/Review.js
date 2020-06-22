import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart} from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useAuthHook } from '../LogIn/UseAuth';

const Review = () => {
    const [cart,setCart] = useState([]);
   
    const removeHandler = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !==productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(()=>{
    //cart 
    const saveCart =  getDatabaseCart();
    const productKeys =  Object.keys(saveCart);
    console.log(productKeys);
        fetch('https://stark-taiga-02598.herokuapp.com/getProductsKeys',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(productKeys)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            const cartProduct = productKeys.map( key =>{
                const product = data.find(pd => pd.key ===key);
                product.quantity = saveCart[key];
                return product ;
            });
            setCart(cartProduct)
        })
    },[])
   const auth = useAuthHook();
    return (
        <div className="shop-container">
            <div className="products-container">
           {
               cart.map(pd=> <ReviewItem removeHandler={removeHandler} product={pd}></ReviewItem>)
           }
           {
               !cart.length && <h1 className="" >The cart is empty, <a href="/shop">go to shop</a></h1>
           }
        </div>
        <div className="cart-container">
            <Cart cart={cart}>
               <Link to="/shipping">
                {  auth.user ?
                    <button className="cart-button"> Proceed Check Out </button>
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