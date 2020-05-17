import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Products from '../Products/Products';


const ProductDetails = () => {
    const {productKey} = useParams();
    const productDetails =  fakeData.find (pf =>pf.key=== productKey)
    return (
        <div>
       <h1> Details coming sooon </h1>
       <Products showAddToCart={false} product ={productDetails}></Products>
        </div>
    );
};

export default ProductDetails;