import React from 'react';
import { useAuthHook } from './UseAuth';



const LogIn = () => {
    const auth = useAuthHook();

    const signInHandler = () =>{
        auth.signInWithGoogle().then(res =>{
            window.location.pathname ="/review"
        })
    }
  const signOutHandler = () =>{
    auth.signOut().then(res =>{
        window.location.pathname ="/"
    })
  }
    return (
        <div>
            <h1>This is log in part</h1>
            {   auth.user ? <button onClick={signOutHandler} >Sign Out</button> :
                <button onClick={signInHandler} >Sign In With Google</button>
            }
        </div>
    );
};

export default LogIn;