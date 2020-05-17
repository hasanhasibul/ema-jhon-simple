import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData'
import './Shop.css'
import Products from '../Products/Products';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    
    const firstTen = fakeData.slice(0,10);
    const [products,setProducts] = useState(firstTen);
    const [cart,setCart] = useState([]);

    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productsKey = Object.keys(saveCart);
        const previousCart = productsKey.map(pk =>{
            const product = fakeData.find(pd => pd.key ===pk);
            product.quantity = saveCart[pk];
            return product ;
        })
        setCart(previousCart);
        },[]);


    const handleAddButton = (onClickProduct) => {
        const productAddedKey = onClickProduct.key ;
        const sameProduct = cart.find(pd => pd.key === productAddedKey);
         let count = 1;
         let newCart;
         if(sameProduct){
             count = sameProduct.quantity + 1;
             sameProduct.quantity = count ;
             const other = cart.filter(pd => pd.key !==productAddedKey);
             newCart = [...other,sameProduct];
         }
         else{
            onClickProduct.quantity = 1;
             newCart = [...cart,onClickProduct];
         }
        setCart(newCart);
        addToDatabaseCart(onClickProduct.key,count)

    }
    
   
    return (
        <div className="shop-container">

           <div className="products-container">
           {
                        products.map(pd => <Products key={pd.key} showAddToCart={true} handleAddButton = {handleAddButton} product={pd}></Products>)
                    }
           </div>
           <div className="cart-container">
              <Cart cart={cart}>
              <Link to="/review"><button className="cart-button">Review Order</button></Link>
              </Cart>
           </div>
           

        </div>
    );
};

export default Shop;