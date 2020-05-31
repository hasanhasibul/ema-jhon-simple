import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.confiq";
import { useState, useEffect } from "react";
import { createContext } from "react";
import React from 'react';
import { useContext } from "react";
import { Route,Redirect } from "react-router-dom";
firebase.initializeApp(firebaseConfig);

const AuthContext = createContext() ;
 export const AuthContextProvider = (props)=>{
    const auth = Auth();
     return <AuthContext.Provider value={auth} > {props.children} </AuthContext.Provider>
}
 export const useAuthHook = () =>{
    return  useContext(AuthContext);
}

const getUser = (user) =>{
    const {displayName,email,photoURL} = user;

    return {name:displayName,email,photo:photoURL}
}

export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuthHook();
    return (
      <Route
        {...rest}
        render={({ location }) =>
        auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  

const Auth = () =>{
    const [user,setUser] = useState(null);

    const signInWithGoogle = ()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
       return firebase.auth().signInWithPopup(provider).then( res=> {
       const signInUser = getUser(res.user);
        setUser(signInUser)
        return res.user;
        })
        .catch(error =>{
            console.log(error);
            return error.message;
        })
    }

    const signOut = () =>{
       return firebase.auth().signOut().then(res =>{
         setUser(null);
         return signOut ;
        })
        .catch(error=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
             const currentUser = getUser(user);
             setUser(currentUser);
             
            } else {
              // No user is signed in.
            }
          });
    },[])

    return {
        user,
        signInWithGoogle,
        signOut
    }

}
export default Auth;