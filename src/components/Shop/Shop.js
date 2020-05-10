import React, { useState } from 'react';
import fakeData from '../../fakeData'
import './Shop.css'
import Products from '../Products/Products';
import Cart from '../Cart/Cart';

const Shop = () => {
    
    const firstTen = fakeData.slice(0,10);
    const [products,setProducts] = useState(firstTen);
    const [cart,setCart] = useState([]);


    const handleAddButton = (onClickProduct) => {
        console.log('product added',onClickProduct);
        const newCart = [...cart,onClickProduct];
        setCart(newCart);

    }
    
   
    return (
        <div className="shop-container">

           <div className="products-container">
           {
                        products.map(pd => <Products handleAddButton = {handleAddButton} product={pd}></Products>)
                    }
           </div>
           <div className="cart-container">
              <Cart cart={cart}></Cart>
           </div>
           

        </div>
    );
};

export default Shop;