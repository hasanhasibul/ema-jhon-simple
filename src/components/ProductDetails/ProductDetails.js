import React from 'react';
import { useParams } from 'react-router-dom';
// import fakeData from '../../fakeData';
import Products from '../Products/Products';
import { useEffect } from 'react';
import { useState } from 'react';


const ProductDetails = () => {
    const {productKey} = useParams();
    const [product,setProduct] = useState(null)
    
    useEffect(()=>{
     fetch('https://stark-taiga-02598.herokuapp.com/product/'+productKey)
     .then(res=>res.json())
     .then(data=>{
        setProduct(data);
     })
    },[])
    // const productDetails =  product.find (pf =>pf.key=== productKey)
    return (
        <div>
       <h1> Details coming sooon </h1>
        { 
          product && <Products showAddToCart={false} product ={product}></Products>
        }
        </div>
    );
};

export default ProductDetails;