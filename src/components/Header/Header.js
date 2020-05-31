import React from 'react';
import logo from '../../images/logo.png';
import './header.css'
import { useAuthHook } from '../LogIn/UseAuth';


const Header = () => {
     const auth = useAuthHook();
     console.log(auth)
    return (
        <div className='header'>
            
            <img src={logo} alt=""/>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/manage">Manage Inventory</a>
                {
                    auth.user ?  <a href="/login">sign out</a>
                    :
                    <a href="/login">sign in</a>
                }
               

            { 
              auth.user &&
              <a href="/login">{auth.user.name}</a>
            }
            </nav>
        </div>
    );
};

export default Header;