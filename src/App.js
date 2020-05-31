import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import LogIn from './components/LogIn/LogIn';

import { AuthContextProvider, PrivateRoute } from './components/LogIn/UseAuth';
import Shipping from './components/Shipping/Shipping';

// export const ContextUser = createContext();

function App() {
  // const user = {name : 'Gudu mia',email : 'godumia@gmail.com'}
  return (
    <div >

      <AuthContextProvider>

      <Router>
      <Header></Header>
        <Switch>
          <Route exact path="/"> 
          <Shop></Shop>
          </Route>

          <Route path="/shop">
          <Shop></Shop>
          </Route>

          <Route path="/review">
           <Review></Review>
          </Route>

          <Route path="/manage" >
            <Manage></Manage>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetails></ProductDetails>
          </Route>
          <Route path="/login" >
            <LogIn></LogIn>
          </Route>
          <PrivateRoute path="/shipping">
            <Shipping></Shipping>
          </PrivateRoute>
          <Route path="*">
            <NotFound></NotFound>
          </Route>

        </Switch>
      </Router>
     
      </AuthContextProvider>
    </div>
  );
}

export default App;
