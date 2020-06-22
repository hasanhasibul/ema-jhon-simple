import React, { useState, useEffect } from 'react';
import './Shop.css'
import Products from '../Products/Products';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    
    const [products,setProducts] = useState([]);
    const [cart,setCart] = useState([]);

    useEffect(()=>{
     fetch('https://stark-taiga-02598.herokuapp.com/products')
     .then(res => res.json())
     .then(data=>{
         setProducts(data)
     })
    },[])

    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productsKey = Object.keys(saveCart);
        if(products.length){
            const previousCart = productsKey.map(pk =>{
                const product = products.find(pd => pd.key ===pk);
                product.quantity = saveCart[pk];
                return product ;
            })
            setCart(previousCart);
        }
        },[products]);


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