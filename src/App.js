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

function App() {
  return (
    <div >
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
          <Route path="*">
            <NotFound></NotFound>
          </Route>

        </Switch>
      </Router>
     
     
    </div>
  );
}

export default App;
